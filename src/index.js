import Uppy from '@uppy/core';
import { Upload } from 'tus-js-client';
import { apiRequest, removeTrailingSlash } from './utils';

/**
 * Class representing a hypermedia uploader using Uppy and tus-js-client.
 */
class HypermediaUploader {
  /**
   * Create a HypermediaUploader.
   * @param {string} endpoint - The endpoint URL for the upload.
   * @param {Object} options - Options for the uploader.
   * @param {Function} options.onError - Callback for error events.
   * @param {Function} options.onProgress - Callback for progress events.
   * @param {Function} options.onSuccess - Callback for success events.
   * @param {boolean} [options.autoProceed=true] - Auto proceed uploads.
   * @param {boolean} [options.allowMultipleUploadBatches=true] - Allow multiple upload batches.
   * @param {boolean} [options.debug=false] - Enable debug mode.
   * @param {number} [options.maxFileSize] - Maximum file size.
   * @param {number} [options.minFileSize] - Minimum file size.
   * @param {number} [options.maxTotalFileSize] - Maximum total file size.
   */
  constructor(endpoint, options) {
    this.endpoint = endpoint;
    this.options = options;

    this.uploader = new Uppy({
      autoProceed: options.autoProceed,
      allowMultipleUploadBatches: false,
      debug: options.debug,
      restrictions: {
        maxFileSize: options.maxFileSize,
        minFileSize: options.minFileSize,
        maxTotalFileSize: options.maxTotalFileSize,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['video/*'],
      },
      infoTimeout: 10000,
    });

    this.setUpUploaderEvents();
  }

  /**
   * Set up events for the uploader.
   * @private
   */
  async setUpUploaderEvents() {
    this.uploader.on('file-added', async (file) => {
      const parsedEndpoint = await removeTrailingSlash(this.endpoint);
      const uploadInformation = await apiRequest(
        `${parsedEndpoint}/api/upload-information`,
        'POST',
        {
          title: file.name,
          size: file.size,
        },
      );

      await this.handleUploadInformation(
        file,
        uploadInformation,
        parsedEndpoint,
      );
    });
  }

  /**
   * Handles the upload information received from the server.
   * @param {Object} file - The file object to be uploaded.
   * @param {Response} uploadInformation - The upload information response from the server.
   * @param {string} parsedEndpoint - The parsed endpoint URL.
   * @private
   */
  async handleUploadInformation(file, uploadInformation, parsedEndpoint) {
    if (uploadInformation.ok) {
      const information = await uploadInformation.json();
      if (information.success) {
        const { data } = information;
        this.startUpload(file, data, parsedEndpoint);
      } else {
        console.error('ERROR:', information);
        throw new Error('Something went wrong before start uploading');
      }
    } else {
      console.error('ERROR:', uploadInformation);
      throw new Error('Something went wrong getting upload information');
    }
  }

  /**
   * Starts the upload process for a file.
   * @param {Object} file - The file object to be uploaded.
   * @param {Object} data - The data object containing the endpoint and headers for the upload.
   * @param {string} parsedEndpoint - The parsed endpoint URL.
   * @private
   */
  startUpload(file, data, parsedEndpoint) {
    const upload = new Upload(file.data, {
      endpoint: data.endpoint,
      retryDelays: [0, 3000, 5000, 10000],
      removeFingerprintOnSuccess: true,
      chunkSize: 3 * 1024 * 1024,
      headers: data.headers,
      metadata: {
        filetype: file.data.type,
        collection: data.metadata.collection,
        title: file.name,
        size: file.size,
      },
      onError: (error) => {
        console.error(error);
        if (this.options.onError) {
          this.options.onError(error);
        }
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const progress = (bytesUploaded / bytesTotal) * 100;
        if (this.options.onProgress) {
          this.options.onProgress(progress, bytesUploaded, bytesTotal);
        }
      },
      onSuccess: async () => {
        if (this.options.onSuccess) {
          this.options.onSuccess(upload);
        }
        await apiRequest(`${parsedEndpoint}/api/upload-completed`, 'POST', {
          tus_file: upload,
        });
      },
    });

    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  }
}

export default HypermediaUploader;
