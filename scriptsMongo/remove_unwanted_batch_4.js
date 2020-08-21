var cnt = 0
db.candidate.aggregate([{
        "$match": {
            "tpmCandidateId": {
                "$exists": true
            }
        }
    },
    {
        "$match": {
            "tpmCandidateId": {
                "$ne": ""
            }
        }
    },
    {
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
    }
]).forEach(data => {
    if (data && data['batches'] && data['batches'].length) {
        for (let i =  data['batches'].length - 1; i >= 0; i--) {
            if (data && data['batches'][i]['batchId']) {
                var batch = db.batch.find({'batchId' : data['batches'][i]['batchId']}).toArray();
                if (batch && batch.length) {
                    
                }else{
                    cnt++;
                    printjson(cnt)
                    data['batches'].splice(i,1)
                }
            }
        }
        db.candidate.save(data);
    }
})