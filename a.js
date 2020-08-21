db.trainingpartner.find({ "isSmart": true, status: { "$nin": ["init", "paymentAwaiting", "Deactivated/blocked"] } }).forEach(data => {

    workflow = db.tpworkflow.find({ tpId: data["userName"], status: { "$in": ["DAAPPROVED", "DAREJECTED"] }, "toUsersRole": "Inspection Agency", "migration": { "$exists": false } }).sort({ "createdOn": -1 }).toArray()
    paymentWorkFlow = db.payments.find({ "userId": data["userName"], "isComplete": true, "migration": { "$exists": false } }).sort({ "_id": -1 }).toArray()
    if (workflow.length > 0 && paymentWorkFlow.length > 0) {
        //createdOn = workflow[0]["createdOn"]         
        transDate = paymentWorkFlow[0]["date"]
        if (data["updatedOn"] < transDate) {
            //data["updatedOn"] = createdOn           
            count++
        }
    }
})
