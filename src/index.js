import { Upload } from 'tus-js-client';

class TusClient {
    constructor(options) {
        this.options = options;
    }


  _getBunnyUploadUrl = async () => {
    
  };

    upload(file) {
        const upload = new Upload(file, {
            ...this.options, // Tus options
            endpoint: 'http://localhost:1080/files/',
            retryDelays: [0, 3000, 5000, 10000, 20000],
            removeFingerprintOnSuccess: true,
            metadata: {
                filename: file.name,
                filetype: file.type,
            },
            onError: function (error) {
                console.log('Failed because: ' + error)
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
                console.log(bytesUploaded, bytesTotal, `${percentage}%`)
            },
            onSuccess: function () {
                console.log('Download %s from %s', upload.file.name, upload.url)
            },
        });

        upload.findPreviousUploads().then(function (previousUploads) {
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0]);
            }
            upload.start();
        });
    }
}

export default TusClient;
