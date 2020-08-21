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
    var batch = db.batch.find({
        "candidates": {
            "$elemMatch": {
                "userName": data['userName']
            }
        }
    }).toArray()
    if (batch && batch.length) {

    } else {
        cnt++;
        printjson(cnt);
        delete data['_id'];
        db.tpm_candidates.insert(data);
        db.candidate.remove({
            "userName": data['userName']
        });
    }
})