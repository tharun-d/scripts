db.tcworkflow.aggregate([
    {
        "$match": {
            "migration": { "$exists": false }, "status": { "$in": ["Approved", "Rejected"] },
            "requestType": { "$nin": ["NIESBUDRequest"] }, "assignedNextUserRole": { "$in": ["Inspection Agency", "PMKK SPOC", "SSC","Holding Agency"] }
        }
    },
    { "$project": { "tcId": 1, "status": 1, "actionTakenOn": 1 } },
    { "$group": { "_id": { "tcId": "$tcId" }, "count": { "$sum": 1 }, "status": { "$push": "$status" }, "actionTakenOn": { "$push": "$actionTakenOn" } } },
    { "$match": { "count": 1 } },
    { "$project": { "tcId": "$_id.tcId", "_id": 0, "status": 1, "actionTakenOn": 1 } }]).forEach(data => {
        tempData = {
        }
        tempData["_id"] = new ObjectId()
        tempData["tcId"] = data["tcId"]
        tempData["status"] = data["status"][0]
        tempData["actionTakenOn"] = data["actionTakenOn"][0]
        tcData = db.trainingcentre.findOne({ userName: data["tcId"] })
        tempData["submittedOn"] = tcData["submittedOn"]
        db.tempSmartTC29July.insert(tempData)

    })