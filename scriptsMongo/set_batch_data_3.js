 var cnt = 0;
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
    }
]).forEach(batch => {
    if (batch && batch['candidates'] && batch['candidates'].length) {
        var batchData = {
            "batchId": batch['batchId'],
            "batchName": batch['batchName'],
            "batchStartDate": batch['batchStartDate'],
            "batchEndDate": batch['batchEndDate']
        }
        batch['candidates'].forEach(can => {
            if (can) {
                db.candidate.find({
                    userName: can['userName']
                }).forEach(data => {
                    if (data) {
                        if (data['batches'] && data['batches'].length) {
                            for (let i = data['batches'].length - 1; i >= 0; i--) {
                                if (data['batches'][i]['batchId'] == batchData['batchId']) {
                                    break;
                                }
                                if (i == 0) {
                                    cnt++
                                    printjson(cnt)
                                    data['batches'].push(batchData);
                                }
                            }
                        } else {
                            cnt++
                            printjson(cnt)
                            data['batches'] = [batchData];
                        }
                        db.candidate.save(data);
                    }
                })
            }
        })
    }
});