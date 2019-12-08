const {Storage} = require('@google-cloud/storage');
const fs = require('fs');

class PivotStorage {
    
    constructor() {
        //setup service account
        let serviceAccount = require('./keyfile.json');
        //set cloud storage
        this.bucketName = 'wuilib.appspot.com';
        this.storage = new Storage(serviceAccount);
    }
    
    async uploadFile(file) {
        
        console.log(file);
        
        // rename the file
        let filename = file.name;
        fs.rename(file.tempFilePath, filename, function(err) {
            if(err) console.log('ERROR: ' + err);
        });

        try {
            var resp = await this.storage.bucket(this.bucketName).upload(filename, {
                // Support for HTTP requests made with `Accept-Encoding: gzip`
                gzip: true,
                // By setting the option `destination`, you can change the name of the
                destination: filename,
                // object you are uploading to a bucket.
                metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
                },
            });

            //make public
            await this.storage.bucket(this.bucketName).file(filename).makePublic();
            console.log(`gs://${this.bucketName}/${filename} is now public.`);
            
            return {
                status: "ok",
                message: "File has been uploaded successfully.",
                params: resp[1]
            };
        } catch (error) {
            console.error(error);
            return {
                status: "error",
                message: error
            };
        }
    }

    async createBucket(bucketName) {
        // Creates the new bucket
        await storage.createBucket(bucketName);
        console.log(`Bucket ${bucketName} created.`);
        return {
            status: "ok",
            message: "Link to file: https://storage.cloud.google.com/" + this.bucketName + "/" + filename,
            params: {}
        };
    }
}

module.exports = PivotStorage