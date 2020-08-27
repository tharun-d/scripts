db.tcworkflow.find({ status: { "$in": ["askingDetailsFromIA", "clarificationDone"] }, "assignedNextUserRole": { "$nin": ["SSC"] } }).forEach(x => {
    if (x["assignedNextUserRole"] == "Desktop Assessor") {
        x["assignedNextUserRole"] = "Inspection Agency"
    }
    if (x["actionTakenBy"]) {
        x["assignedNextUser"] = x["actionTakenBy"]
    }
    db.tcworkflow.save(x)
})

db.tcworkflow.updateMany({
    status: { "$in": ["askingDetailsFromIA", "clarificationDone"] },
    actionTakenByRole: "PMKK SPOC"
},
    { $set: { "assignedNextUser": "HARPREET.KAUR", "assignedNextUserRole": "PMKK SPOC" } })

//askingDetailsFromIA //Reach out IA
//clarificationDone //clarificationDone

db.tcworkflow.find({ _id: ObjectId("5d4bea536516114505f38059") }).pretty()

//To CHeck//
///
db.tcworkflow.find({ status: "askingDetailsFromIA" }).count()

count = 0
db.tcworkflow.find({ status: "Reach out TC" }).forEach(data => {

    tcData = db.trainingcentre.findOne({ "userName": data["tcId"], "jobRoles.qp": data["jobRole"]["qp"] }, { "jobRoles.$": 1 })
    if (tcData && tcData["jobRoles"][0]["status"] == "Reach out TC") {

    } else {
        // db.tcworkflow.remove({ "_id": data["_id"] })
        count++
    }

})
print("removing: ", count)


count = 0
db.tcworkflow.find({ status: "Reach out IA", "jobRole.qp": { "$exists": true } }).forEach(data => {
    tcData = db.trainingcentre.findOne({ "userName": data["tcId"], "jobRoles.qp": data["jobRole"]["qp"] }, { "jobRoles.$": 1 })
    if (tcData) {
        print(tcData["jobRoles"][0]["status"])
    } else {
        db.tcworkflow.remove({ "_id": data["_id"] })
        count++
    }
})
print("removing: ", count)



count = 0
db.tcworkflow.find({ status: "Reach out IA", "jobRole.qp": { "$exists": true } }).sort({ "_id": -1 }).forEach(data => {
    iaData = db.tcworkflow.findOne({ "tcId": data["tcId"], "jobRole.qp": data["jobRole"]["qp"], status: "askingDetailsFromIA" })
    if (iaData) {
        //print(data["tcId"], data["jobRole"]["qp"])
    } else {
        db.tcworkflow.remove({ "_id": data["_id"] })
        count++
    }
})
print("removing: ", count)






db.tcworkflow.update({ "_id": ObjectId("5e7b4ffcd38b750337f0d610") },
    { "$set": { "conversation.2.actionTakenOn": ISODate("2020-07-24T10:50:31.707Z") } })

    //TC109804