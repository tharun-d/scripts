db.batch.aggregate([{
        "$match": {
            "tpmId": {
                "$exists": true
            }
        }
    },
    {
        "$match": {
            "tpmId": {
                "$ne": ""
            }
        }
    },
    {
        "$match": {
            "tpmBatchId": {
                "$exists": true
            }
        }
    },
    {
        "$match": {
            "tpmBatchId": {
                "$ne": ""
            }
        }
    },
    {
        "$addFields": {
            "cansize": {
                "$size": "$candidates"
            }
        }
    },
    {
        "$group": {
            "_id": {
                "tpmId": "$tpmId",
                "tpmBatchId": "$tpmBatchId"
            },
            "count": {
                "$sum": 1
            },
            "batchId": {
                "$push": {
                    "batchId": "$batchId",
                    "cansize": "$cansize",
                    "size": "$size"
                }
            }
        }
    },
    {
        "$match": {
            "count": {
                "$gt": 1
            }
        }
    }
]).forEach(data => {
    if (data && data['batchId'] && data['batchId'].length) {
        var firstElem = {};
        var candidates = [];
        var grpCan = {};

        for (let i = 0; i < data['batchId'].length; i++) {
            var batchData = db.batch.findOne({
                'batchId': data['batchId'][i]['batchId']
            })
            if (batchData) {
                if (batchData['candidates'] && batchData['candidates'].length) {
                    for (let j = 0; j < batchData['candidates'].length; j++) {
                        if (!grpCan[batchData['candidates'][j].tpmCandidateId]) {
                            grpCan[batchData['candidates'][j].tpmCandidateId] = batchData['candidates'][j];
                        }
                    }
                }
                if (i == 0) {
                    firstElem = batchData;
                } else {
                    delete batchData['_id'];
                    db.tpm_batch.insert(batchData);
                    db.batch.remove({
                        batchId: batchData['batchId']
                    });
                }
            }
        }
        var keys = Object.keys(grpCan);
        if (keys && keys.length) {
            keys.forEach(key => {
                if (grpCan[key]) {
                    candidates.push(grpCan[key]);
                }
            });
            firstElem['candidates'] = candidates;
            db.batch.save(firstElem);
        }
    }
})