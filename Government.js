db.trainingcentre.updateOne({ userName: "TC300044" }, {
    $set: {
        trainingCenterType: "Government",
        "trainingPartner.type": "Government Institute"
    }
})

db.trainingcentre.updateOne({ userName: "TC300044" },
    { $set: { "jobRoles.$[].status": "Scheme Approved" } })


db.trainingcentre.find({ userName: "TC113323" }, {
    trainingCenterType: 1,
    status: 1
})

db.tcworkflow.find({ tcId: "TC046867", "status": "CIDONE" }).forEach(x => {
    var qcw = db.tcworkflow.findOne({
        tcId: x['tcId'],
        "status": { "$in": ["ACTIONTAKEN", "CIDONE"] },
        "assignedNextUserRole": "Quality Control",
        migration: { "$exists": false }
    })
    if (!qcw) {
        x['assignedNextUser'] = x['otherInformation']['centreinspection']['qcuserName']
        x['assignedNextUserRole'] = "Quality Control"
        x['status'] = "ACTIONTAKEN"
        //printjson(x)
        x["_id"] = new ObjectId()
        db.tcworkflow.insert(x)
        if (x['zone'] == 'QACA') {
            x['assignedNextUser'] = "PQ0001"
        } else {
            x['assignedNextUser'] = "PI0006"
        }
        x['assignedNextUserRole'] = "Inspection Agency"
        x["_id"] = new ObjectId()
        db.tcworkflow.insert(x)
        print(x['tcId'])
    }
})

db.trainingcentre.update({ userName: "TC112555" },
    {
        $set:
        {
            "haReviews.fileURL": "Holding Agency/HA_100001/recommendationLetter/85182b5c-b9cb-4c67-ad52-cd8b20fd9f77_DAIRY FARMERS   KVK AHMEDNAGAR DNR.pdf",
            "haReviews.comment": "1.\tTraining provider name does not match with name provided in CAAF.\n2.\tTraining center name does not match with name provided in CAAF.\n3.\tTraining center has not selected the job role mentioned in Endorsement letter.\n",
            "status": "Rejected"
        }
    })
