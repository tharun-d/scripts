db.trainerPreRequisite.remove({
    "qpCode": {
        $in: [
            "SGJ/Q6404",
            "SGJ/Q6403",
            "SGJ/Q6402"
        ]
    }
})
db.getCollection('trainerPreRequisite').insertMany([
    {
        "qpCode": "SGJ/Q6404",
        "jobRoleName": "Faecal Sludge Treatment Plant O&M Technician",
        "sscName": "Green Jobs",
        "eduQualification": [
            {
                "_id": ObjectId("5f58ba06aebe88034fc5902b"),
                "minEduReq": [
                    {
                        "minEduQualID": "ITI",
                        "minEduQualDesc": "ITI"
                    },
                ],
                "requiredIndustryExp": 2,
                "trainingDeliveryExpReq": 0,
                "totalExp": 2,
                "additionalRemarks": ""
            }
        ],
        "status": "Active",
        "createdOn": ISODate("2020-11-26T00:00:00.000Z"),
        "updatedOn": ISODate("2020-11-26T00:00:00.000Z")
    },
    {
        "qpCode": "SGJ/Q6403",
        "jobRoleName": "Desludging Operator",
        "sscName": "Green Jobs",
        "eduQualification": [
            {
                "_id": ObjectId("5f58bc0aaebe88034fc59031"),
                "minEduReq": [
                    {
                        "minEduQualID": "10th Class",
                        "minEduQualDesc": "Class 10th"
                    }
                ],
                "requiredIndustryExp": 2,
                "trainingDeliveryExpReq": 0,
                "totalExp": 2,
                "additionalRemarks": ""
            }
        ],
        "status": "Active",
        "createdOn": ISODate("2020-11-26T00:00:00.000Z"),
        "updatedOn": ISODate("2020-11-26T00:00:00.000Z")
    },
    {
        "qpCode": "SGJ/Q6402",
        "jobRoleName": "Septic Tank Technician",
        "sscName": "Green Jobs",
        "eduQualification": [
            {
                "_id": ObjectId("5f58c2ccaebe88034fc59035"),
                "minEduReq": [
                    {
                        "minEduQualID": "10th Class",
                        "minEduQualDesc": "Class 10th",
                    }
                ],
                "requiredIndustryExp": 2,
                "trainingDeliveryExpReq": 0,
                "totalExp": 2,
                "additionalRemarks": ""
            }
        ],
        "status": "Active",
        "createdOn": ISODate("2020-11-26T00:00:00.000Z"),
        "updatedOn": ISODate("2020-11-26T00:00:00.000Z")
    }
])

qpCodes = db.trainerPreRequisite.distinct("qpCode")
qpCodes.forEach(x => {
    count = db.trainerPreRequisite.find({ "qpCode": x }).count()
    if (count > 1) {
        print(x)
    }
})

db.labArea.count()
qpCodes = db.labArea.distinct("qpCode")
print(qpCodes.length)

//
finalToRemove = []
qpCodes = db.labArea.distinct("qpCode")
qpCodes.forEach(x => {
    count = db.labArea.find({ "qpCode": x }).count()
    if (count > 1) {
        var obj = {}
        obj["qpCode"] = x
        obj["count"] = count
        finalToRemove.push(obj)
    }
})

finalToRemove.forEach(data => {
    for (let index = 1; index < data["count"]; index++) {
        db.labArea.remove({ qpCode: data["qpCode"] }, true)
        //print(data["qpCode"])
    }
})

db.labArea.remove({ qpCode: "AGR/Q0201" })

db.labArea.insert(
    {
        "_id": ObjectId("5e9e73aebab3e589fdfd55b5"),
        "qpCode": "AGR/Q0201",
        "jobRoleName": "Soyabean Cultivator",
        "sscName": "Agriculture",
        "nsqfLevel": "4",
        "isLabAreaRequired": false,
        "labSize": "",
        "carpetArea": "5000",
        "hybridArrangement": false,
        "isGMandatoryReq": true,
        "remarks": "",
        "itLabSpec": {
            "isITLab": false,
            "remarks": ""
        },
        "additionalCoveredArea": {
            "required": true,
            "coveredArea": "5000 sqft Additional Training Area (Demonstration area in terms of cultivated/cultivable field is required with availability of at least one irrigation source (Pond/Hand Pump/Well/ Canal) ; either owned/ leased/Formal Tie-up)"
        },
        "status": "Active",
        "qpID": ObjectId("5d6e71a14765aa37f0fe9e66"),
        "updatedOn": ISODate("2021-01-21T10:43:19.924Z")
    })