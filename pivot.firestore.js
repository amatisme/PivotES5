const {Firestore} = require('@google-cloud/firestore');
const fs = require('fs');
const serviceAccount = require('./keyfile.json');
const admin = require('firebase-admin');

class PivotFireStore {
    //setup service account
    constructor() {
        //setup firestore database
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.db = admin.firestore();
    }

    async getDocuments(store) {
        return new Promise(resolve => {
            this.db.collection(store).get().then(snapshot => {
                if (snapshot.empty) {
                    resolve({
                        status: "ok",
                        message: "No matching documents."
                    });
                } else {
                    let data = [];
                    snapshot.forEach(doc => {
                        data.push(doc.data());
                    });
                    resolve({
                        status: "ok",
                        count: data.length,
                        data: data
                    });
                }
            }).catch(err => {
                resolve({
                    status: "error",
                    message: "Error getting documents.",
                    params: err
                });
            });
        });
    }

    //document methods
    async addDocument(store, params, data) {
        return new Promise(resolve => {
            //create map
            var myMap = new Map();
            
            //set map keys
            Object.keys(data).forEach(key => { myMap.set(key); });
            
            //validate map keys
            var bool = true;
            params.forEach(param => { if(!myMap.has(param)) bool = false; });

            //response
            if(bool == true) {
            this.db.collection(store).doc().set(data)
            .then(function() {
                resolve({
                status: "ok",
                message: "Document successfully written!",
                data: data
                });
            })
            .catch(function(error) {
                resolve({
                status: "error",
                message: "Error writing document: ",
                error: error
                });
            });
            } else {
            resolve({
                status: "error",
                message: "Malformed object. Object must include:",
                params: params
            });
            }
        });
    }
}

module.exports = PivotFireStore

