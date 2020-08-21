http://13.233.175.254/api/smart/v1/appeal/tc/report?isExcel=no
http://localhost:3030/api/smart/v1/appeal/tc/report?isExcel=no
https://uatservices.ekaushal.com/api/smart/v1/appeal/tc/report?isExcel=no
db.tcappealandreinspection.distinct("grevianceAgainstUserRole")
//[ "Inspection Agency", "PMKK SPOC", "SSC" ]
db.tcappealandreinspection.distinct("status")
[
    "New Justification",
    "Justification Received",
    "Justification Accepted",
    "Clarification Submitted",
    "Asking Clarification",
    "Justification Submitted from IA",
    "Clarification Submitted from IA",
    "Applied for Justification from IA",
    "Applied for Justification from SSC",
    "Applied for Justification from PMKK SPOC"
]
db.tcappealandreinspection.find({ "status": "Applied for Justification from IA" }).count()
4
db.tcappealandreinspection.find({ "status": "Applied for Justification from SSC" }).count()
2
db.tcappealandreinspection.find({ "status": "Applied for Justification from PMKK SPOC" }).count()
1
db.tcappealandreinspection.find({ "status": "Justification Submitted from IA" }).count()
5
db.tcappealandreinspection.find({ "status": "Clarification Submitted from IA" }).count()
3
db.tcappealandreinspection.find({ "status": "Asking Clarification" }).count()
3
db.tcappealandreinspection.find({ "grevianceAgainstUser": { "$exists": true } }).count()
184
db.tcappealandreinspection.find({ "assignedUser": { "$exists": true } }).count()
184
//100
//71 //PMKK SPOC
// can be PMKK SPOC
db.tcappealandreinspection.distinct("assignedUserRole", { "grevianceAgainstUser": { "$exists": false } })
["Inspection Agency", "PMKK SPOC", "SSC", "Appeal Pmu"]

//sector name in jobrole

count = 0
a = db.tcappealandreinspection.distinct("tcId", { "requestAgainst": "Job" })
a.forEach(x => {
    s = db.tcappealandreinspection.findOne({ "tcId": x, "requestAgainst": "Job" })
    z = db.tcappealandreinspection.find({ "tcId": x, "status": s["status"], "jobRole.qp": s["jobRole"]["qp"] }).count()
    if (z > 1) {
        print(x, "you can remove: ", z - 1)

        db.tcappealandreinspection.remove({
            "tcId": x, "status": s["status"],
            "jobRole.qp": s["jobRole"]["qp"], "_id": { "$nin": [s["_id"]] }
        })
        count = count + (z - 1)
    }
})
print("dummy total data: ", count)

db.tcappealandreinspection.find({ "oldJobRoleStatus": { "$exists": false }, "jobRoleStatus": { "$exists": true } }).forEach(x => {
    x["oldJobRoleStatus"] = x["jobRoleStatus"]
    db.tcappealandreinspection.save(x)
})

//dummy for jobrole
db.tcappealandreinspection.remove({ tcId: "TC052423", "status": "Justification Received" })
db.tcappealandreinspection.remove({ tcId: "TC059587", "status": { "$nin": ["Asking Clarification"] } })
db.tcappealandreinspection.remove({ "tcId": "TC042153", status: "New Justification" })
//dummy for center
//db.tcappealandreinspection.remove({ "tcId": "TC059498", "requestAgainst": "Training Centre", "status": "Justification Received" })

db.tcappealandreinspection.updateMany({}, {
    $unset: {
        "createdOn": "", "responseReceivedDate": "",
        "paymentDetails": "", "jobRoleStatus": "",
        "inspectionDateDetails": "", "justificationStatus": ""
    }
})
db.tcappealandreinspection.updateMany({}, {
    $rename: {
        "appealDate": "createdOn",
        "justIficationResponseReceivedDate": "justificationResponseReceivedDate"
    }
})
db.tcappealandreinspection.updateMany({}, {
    $rename: {
        "appealDate": "createdOn",
    }
})
db.tcappealandreinspection.updateMany({ "assignedUser": { "$exists": false }, "assignedUserRole": "PMKK SPOC" },
    { "$set": { "assignedUser": "HARPREET.KAUR" } })

db.tcappealandreinspection.find({ "status": "New Justification" }).forEach(x => {
    if (x["assignedUserRole"]) {
        if (x["assignedUserRole"] == "Inspection Agency") {
            x["status"] = "Applied for Justification from IA"
        }
        if (x["assignedUserRole"] == "SSC") {
            x["status"] = "Applied for Justification from SSC"

        }
        if (x["assignedUserRole"] == "PMKK SPOC") {
            x["status"] = "Applied for Justification from PMKK SPOC"

        }
    }
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "Justification Received" }).forEach(x => {
    if (x["assignedUserRole"]) {
        if (x["assignedUserRole"] == "Inspection Agency") {
            x["status"] = "Justification Submitted from IA"
        }
        if (x["assignedUserRole"] == "SSC") {
            x["status"] = "Justification Submitted from SSC"

        }
        if (x["assignedUserRole"] == "PMKK SPOC") {
            x["status"] = "Justification Submitted from PMKK SPOC"

        }
    }
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "Asking Clarification" }).forEach(x => {
    if (x["assignedUserRole"]) {
        if (x["assignedUserRole"] == "Inspection Agency") {
            x["status"] = "TC Asking Clarification from IA"
        }
        if (x["assignedUserRole"] == "SSC") {
            x["status"] = "TC Asking Clarification from SSC"

        }
        if (x["assignedUserRole"] == "PMKK SPOC") {
            x["status"] = "TC Asking Clarification from PMKK SPOC"

        }
    }
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "Clarification Submitted" }).forEach(x => {
    if (x["assignedUserRole"]) {
        if (x["assignedUserRole"] == "Inspection Agency") {
            x["status"] = "Clarification Submitted from IA"
        }
        if (x["assignedUserRole"] == "SSC") {
            x["status"] = "Clarification Submitted from SSC"

        }
        if (x["assignedUserRole"] == "PMKK SPOC") {
            x["status"] = "Clarification Submitted from PMKK SPOC"

        }
    }
    db.tcappealandreinspection.save(x)
})


db.tcappealandreinspection.find({ "status": "Justification Accepted" }).forEach(x => {
    len = x["conversation"].length
    if (x["conversation"][len - 1]["actionTakenByRole"] != "Training Centre") {
        x["justificationAcceptedRejectedDate"] = x["conversation"][len - 1]["actionTakenOn"]
    }
    x["tcAcceptedOrRejectedJustificaion"] = "Accepted"

    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "TC Asking Clarification from IA" }).forEach(x => {
    len = x["conversation"].length
    x["tcAskingClarificationDate"] = x["conversation"][len - 1]["actionTakenOn"]
    x["tcClarification"] = x["conversation"][len - 1]["comment"]
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "TC Asking Clarification from SSC" }).forEach(x => {
    len = x["conversation"].length
    x["tcAskingClarificationDate"] = x["conversation"][len - 1]["actionTakenOn"]
    x["tcClarification"] = x["conversation"][len - 1]["comment"]
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "TC Asking Clarification from PMKK SPOC" }).forEach(x => {
    len = x["conversation"].length
    x["tcAskingClarificationDate"] = x["conversation"][len - 1]["actionTakenOn"]
    x["tcClarification"] = x["conversation"][len - 1]["comment"]
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "Clarification Submitted from IA" }).forEach(x => {
    len = x["conversation"].length
    x["tcAskingClarificationDate"] = x["conversation"][len - 2]["actionTakenOn"]
    x["tcClarification"] = x["conversation"][len - 2]["comment"]
    db.tcappealandreinspection.save(x)
})

db.tcappealandreinspection.find({ "status": "Clarification Submitted from IA" }).forEach(x => {
    len = x["conversation"].length
    x["clarificationResponseReceivedDate"] = x["conversation"][len - 1]["actionTakenOn"]
    x["clarificationiaComments"] = x["conversation"][len - 1]["comment"]
    db.tcappealandreinspection.save(x)
})

db.payments.update({ "requestMetadata.subscriptionDetails.referenceType": "Tc Appeal", migration: { "$exists": false } },
    { "$set": { "requestMetadata.subscriptionDetails.referenceType": "Appeal Process Fee", "uuid": "61493f1d-776e-448d-a8f5-337c12ba0d56" } })

db.tcappealandreinspection.update({ "tcId": "TC059498", "assignedUserRole": "Appeal Pmu" },
    { "$set": { "uuid": "61493f1d-776e-448d-a8f5-337c12ba0d56" } })

db.tcappealandreinspection.find({ "assignedUser": { "$exists": false } }).count()

var count = 0
db.tcappealandreinspection.find({ "createdOn": { "$exists": true } }).forEach(x => {
    var zone = null
    var tc = db.tcworkflow.find({
        "tcId": x['tcId'], assignedNextUserRole: { "$in": ['PMKK SPOC', "SSC", "Inspection Agency"] }, otherInformation: { "$exists": true },
        createdOn: { "$lte": x['createdOn'] }, migration: { "$exists": false }
    }).sort({ "_id": -1 }).limit(1).toArray()
    if (tc && tc.length > 0) {
        x['inspectionHappendOn'] = tc[0]['otherInformation']['centreinspection']['proposeddate']
        zone = tc[0]['zone']
    }
    if (x['assignedUserRole'] == 'PMKK SPOC') {
        x['agencyName'] = 'PMKK PMU'
    }
    if (x['assignedUserRole'] == 'SSC') {
        x['agencyName'] = 'SCPWD'
    }
    if (x['assignedUserRole'] == 'Inspection Agency') {
        x['agencyName'] = zone
    }
    db.tcappealandreinspection.save(x)
})


///////


db.tcappealandreinspection.update({ "_id": ObjectId("5ecf8bec2cd7c8594aa738e4") },

    { "$set": { "status": "Forward to Accreditation Committee", "updatedInspectionReport": false } })

db.tcappealandreinspection.update({ "_id": ObjectId("5ed4ac212b29dc6535032cee") },

    { "$set": { "assignedUser": "IA_000001" } })

db.tcworkflow.find({ "assignedNextUserRole": "PMKK SPOC" }).forEach(x => {
    x["actionTakenBy"] = "HARPREET.KAUR"
    db.tcworkflow.save(x)
})

db.tcworkflow.find({ "assignedNextUserRole": "Inspection Agency" }).forEach(x => {
    x["actionTakenBy"] = x["assignedNextUser"]
    db.tcworkflow.save(x)
})

db.tcworkflow.find({ "assignedNextUserRole": "Inspection Agency" }).forEach(x => {
    x["actionTakenBy"] = x["assignedNextUser"]
    db.tcworkflow.save(x)
})

db.tcworkflow.find({ "assignedNextUserRole": { "$in": ["Inspection Agency", "PMKK SPOC", "SSC"] } }).forEach(x => {
    if (x["status"] == "CIAccepted") {
        x["status"] = "ACTIONTAKEN"
    }
    db.tcworkflow.save(x)
})

db.tcappealandreinspection.find({ agencyName: "SCPWD", "jobRole.sectorId": { "$nin": ["40"] } }).forEach(x => {

    tcData = db.trainingcentre.findOne({ userName: x["tcId"] }, { trainingCenterType: 1, address: 1 })
    if (tcData["trainingCenterType"] == "NON PMKK") {
        x["agencyName"] = tcData["address"]["zone"]
    }
    if (tcData["trainingCenterType"] == "PMKK" || tcData["trainingCenterType"] == "PMKK SPOKE") {
        x["agencyName"] = "PMKK PMU"
    }
    db.tcappealandreinspection.save(x)
})

count = 0
db.tcappealandreinspection.find({
    status: {
        "$in": ["Applied for Justification from IA",
            "Applied for Justification from SSC",
            "Applied for Justification from PMKK SPOC"]
    },
    "requestAgainst": "Job",
}).forEach(data => {

    tcData = db.trainingcentre.findOne({ userName: data["tcId"], "jobRoles.qp": data["jobRole"]["qp"] }, { "jobRoles.$": 1 })
    if (tcData && tcData["jobRoles"][0]["status"] != "Justification Request") {
        count = count + 1
        print(tcData["jobRoles"][0]["status"])
        db.tcappealandreinspection.remove({ "_id": data["_id"] })
    }
})
print(count)

db.tcappealandreinspection.find({
    status: {
        "$in": ["Applied for Justification from IA",
            "Applied for Justification from SSC",
            "Applied for Justification from PMKK SPOC"]
    },
    "requestAgainst": "Job",
}).sort({ "_id": -1 }).pretty()


count = 0
db.tcappealandreinspection.find({
    status: {
        "$in": ["Applied for Justification from IA",
            "Applied for Justification from SSC",
            "Applied for Justification from PMKK SPOC"]
    },
    "requestAgainst": "Job",
}).forEach(data => {

    tcData = db.trainingcentre.findOne({ userName: data["tcId"], "jobRoles.qp": data["jobRole"]["qp"] }, { "jobRoles.$": 1 })
    if (tcData && tcData["jobRoles"][0]["status"] != "Justification Request" &&
        tcData["jobRoles"][0]["status"] != "Applied for Justification from IA" &&
        tcData["jobRoles"][0]["status"] != "Applied for Justification from SSC" &&
        tcData["jobRoles"][0]["status"] != "Applied for Justification from PMKK SPOC") {
        count = count + 1
        db.tcappealandreinspection.remove({ "_id": data["_id"] })
    }
})
print("removed data: ", count)
