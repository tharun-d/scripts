db.trainingcentre.find({ userName: "TC109822" },
    { "jobRolesWentForReAccredation": 1, "accrediationCycle": 1, "accrediationredaCycle": 1 }).pretty()


db.trainingcentre.update({ userName: "TC125227" },
    { "$set": { status: "DEACCREDIATED", "jobRoles.$[].sscStatus": "deaccrediated" } })

db.trainingcentre.update({ userName: "TC125227" },
    { "$set": { status: "Approved", "jobRoles.$[].sscStatus": "Accredited" } })

db.trainingcentre.find({ userName: "TC125227" },
    { "jobRoles.sscStatus": 1, "jobRoles.schemeApprover": 1, "jobRoles.listOfComments": 1 }).pretty()


db.trainingcentre.update({ userName: "TC125227" },
    { "$unset": { accrediationCycle: "", "accrediationredaCycle": "" } })

db.tcworkflow.updateMany({ "otherInformation.centreinspection.proposeddate": { "$exists": true }, "tcId": "TC125227" },
    {
        "$set":
        {
            "otherInformation.centreinspection.proposeddate": ISODate("2020-12-31T00:00:00Z"),
        }
    })

db.trainingcentre.find({ userName: "TC109853" },
    { "accrediationCycle": 1, "jobRoles.serialNumber": 1 }).pretty()

db.trainingcentre.find({
    "userName": /TC1/, "jobRoles": { "$exists": true }, status: "Qualified",
    "$and": [{ "jobRoles.sscStatus": "Conditionally Accrediated" }, { "jobRoles.affiliationDone": true }]
}).sort({ "_id": -1 }).forEach(tcDetails => {
    hello = true
    count = 0
    tcDetails.jobRoles.forEach(jobRoleValue => {
        if (jobRoleValue["sscStatus"] == "Conditionally Accrediated") {
            count = count + 1
        } else {
            hello = false
        }
    })
    if (count > 2 && hello) {
        print(tcDetails["userName"])
    }
})