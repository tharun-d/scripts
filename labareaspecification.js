
db.labArea.remove({
    "qpCode": "THC/Q0307"
})
db.labArea.insert({
    "qpID": ObjectId("5c9e0aaac13dec2df47d1e2c"),
    "qpCode": "THC/Q0307",
    "jobRoleName": "Food & Beverage Service - Trainee",
    "sscName": "Tourism and Hospitality Skill Council",
    "nsqfLevel": "3",
    "isLabAreaRequired": true,
    "labSize": "300",
    "hybridArrangement": false,
    "isGMandatoryReq": false,
    "additionalCoveredArea": {
        "required": false,
    },
    "itLabSpec": {
        "isITLab": false,
        "remarks": ""
    },
    "remarks": "",
    "status": "Active",
    "createdOn": ISODate("2020-12-30T00:00:00.000Z"),
    "updatedOn": ISODate("2020-12-30T00:00:00.000Z")
})


db.qps.updateMany({
    "qpCode": "THC/Q0307"
}, {
    $set: {
        "labSpecStatus": "Active"
    }
}) 