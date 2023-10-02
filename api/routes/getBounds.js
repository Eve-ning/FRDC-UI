const {Storage} = require('@google-cloud/storage');
const Papa = require('papaparse');
const express = require("express");
var router = express.Router();

async function getBounds() {
    const projectId = 'your Google Cloud project ID';
    const storage = new Storage({projectId});
    const bucket = await storage.bucket("tree-scan-data");

    const file = bucket.file("raw/10May2021/90deg43m85pct255deg/bounds.csv");
    if (await file.exists()) {
        const data = await file.download();
        const csvAsString = data.toString('utf-8');

        // Parse CSV string to JSON
        const result = Papa.parse(
            csvAsString, {header: true, skipEmptyLines: true}
        );

        // Log or use the resulting array
        return result.data;
    } else {
        throw new Error("File does not exist");
    }
}

router.get('/',
    function (req,
              res, next) {
        getBounds()
            .then(boundsData => {
                res.send(boundsData);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    });
module.exports = router;