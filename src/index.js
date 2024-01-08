// import { Upload } from 'tus-js-client';
import { apiRequestExternal } from './utils';

class TusClient {
    constructor(key) {
        this.key = key;
    }

    upload(file) { 
      console.log({ file }) 
      return 'Uploading file'
        // const upload = new Upload(file, {
        //     endpoint: 'http://localhost:1080/files/',
        //     retryDelays: [0, 3000, 5000, 10000, 20000],
        //     removeFingerprintOnSuccess: true,
        //     metadata: {
        //         filename: file.name,
        //         filetype: file.type,
        //     },
        //     onError: function (error) {
        //         console.log('Failed because: ' + error)
        //     },
        //     onProgress: function (bytesUploaded, bytesTotal) {
        //         const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
        //         console.log(bytesUploaded, bytesTotal, `${percentage}%`)
        //     },
        //     onSuccess: function () {
        //         console.log('Download %s from %s', upload.file.name, upload.url)
        //     },
        // });

        // upload.findPreviousUploads().then(function (previousUploads) {
        //     if (previousUploads.length) {
        //         upload.resumeFromPreviousUpload(previousUploads[0]);
        //     }
        //     upload.start();
        // });
    }

    _getBunnyUploadUrl = async () => {
      await apiRequestExternal('https://api.hypermedia.link/api/upload/token-request', 'POST', {
        key: this.key
      }).then(response => {
        console.log({ response })
        return response
      }).catch(error => console.log({ error }))
    };
}

export default TusClient;
