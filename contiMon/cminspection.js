// Initial to mobile


//After Updating in mobile by to QC



db.cmStatusLog.remove({ tcUserName: "TC1500455" })
db.cmworkflow.remove({ tcId: "TC1500455" })
db.cminspection.remove({ userName: "TC1500455" })
db.tccontinuousmonitoring.remove({ userName: "TC1500455" })

db.trainingcentre.aggregate([
    //{ "$match": { userName: { "$in": [] } } },
    { "$group": { "_id": "$address.state.name", "stateCount": { "$sum": 1 } } },
])

db.trainingcentre.aggregate([
    {
        "$match": {
            "processType": "Accreditation & Affiliation", status: { "$nin": ["init", "TC_CREATED", "paymentAwaiting", "blocked", "Deactivated/blocked", "INACTIVE", "DEACCREDIATED", "applicationWithDrawl"] },
            "continuousMonitoringPayment": "success", "rating": { "$gte": 3 },
            "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] }
        }
    },
    { "$group": { "_id": "$address.state.name", "stateCount": { "$sum": 1 } } },

]).pretty()

db.trainingcentre.aggregate([
    { "$match": { userName: { "$in": ["TC920028", "TC1500455"] } } },
    { "$unwind": "$jobRoles" },
    { "$match": { "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] } } },
    { "$project": { "userName": 1, "schemeName": "$jobRoles.scheme.name" } },
    { "$group": { "_id": "$schemeName", "schemeCount": { "$sum": 1 }, "userName": { "$push": "$userName" } } },
]).pretty()

db.trainingcentre.aggregate([
    { "$match": { userName: { "$in": ["TC920028", "TC1500455"] } } },
    { "$unwind": "$jobRoles" },
    { "$match": { "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] } } },
    { "$project": { "userName": 1, "schemeName": "$jobRoles.scheme.name" } },
    { "$group": { "_id": { "schemeName": "$schemeName" }, "schemeCount": { "$sum": 1 }, "userName": { "$push": "$userName" } } },
]).pretty()

db.trainingcentre.aggregate([
    { "$match": { "continuousMonitoringPayment": "success", "rating": { "$gte": 3 }, status: "Qualified", "trainingPartner.userName": { "$exists": true } } },
    { "$unwind": "$jobRoles" },
    { "$match": { "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] } } },
    {
        "$project": {
            "userName": 1, "_id": 0, "schemeName": "$jobRoles.scheme.name",
            "rating": "$rating", "stateName": "$address.state.name",
            "qpCode": "$jobRoles.qp",
        }
    },
]).pretty()

db.smarttc_26jun2020.aggregate([
    {
        "$match": {
            "processType": "Accreditation & Affiliation", status: { "$nin": ["init", "TC_CREATED", "paymentAwaiting", "blocked", "Deactivated/blocked", "INACTIVE", "DEACCREDIATED", "applicationWithDrawl"] },
            "continuousMonitoringPayment": "success", "rating": { "$gte": 3 },
            "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] }
        }
    },
    { "$group": { "_id": "$address.state.name", "stateCount": { "$sum": 1 } } },
    {
        "$project": {
            "stateName": "$_id",
            "_id": 0,
            "stateCount": 1,
            //"tcIds": 1,
            "statePercentage": { "$multiply": [{ "$divide": ["$stateCount", 5905] }, 100] },
        }
    },

]).pretty()

db.cmassigninspectiondata.aggregate([

    { "$group": { "_id": "$stateName", "stateCount": { "$sum": 1 } } },
    {
        "$project": {
            "stateName": "$_id",
            "_id": 0,
            "stateCount": 1,
            //"tcIds": 1,
        }
    },

]).pretty()

db.smarttc_26jun2020.aggregate([
    {
        "$match": {
            "processType": "Accreditation & Affiliation", status: { "$nin": ["init", "TC_CREATED", "paymentAwaiting", "blocked", "Deactivated/blocked", "INACTIVE", "DEACCREDIATED", "applicationWithDrawl"] },
            "continuousMonitoringPayment": "success", "rating": { "$gte": 3 },
            "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] }
        }
    }])


db.smarttc_26jun2020.find({
    "processType": "Accreditation & Affiliation", status: { "$nin": ["init", "TC_CREATED", "paymentAwaiting", "blocked", "Deactivated/blocked", "INACTIVE", "DEACCREDIATED", "applicationWithDrawl"] },
    "continuousMonitoringPayment": "success", "rating": { "$gte": 3 },
    "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated"] }
}, { userName: 1, rating: 1, _id: 0 }).toArray()

//
a = db.trainingcentre.aggregate([
    { "$match": { "processType": "Accreditation & Affiliation" } },
    { "$unwind": "$jobRoles" },
    { "$match": { "jobRoles.scheme.name": { "$in": ["MIDH (Mission for Integrated Horticulture)", "RKVY (Rashtriya Krishi Vikas Yojna)"] } } },
    {
        "$project": {
            "userName": 1, "_id": 0, "qp": "$jobRoles.qp",

        }
    },
]).toArray()

a.forEach( data => {
    print(data["userName"])
})