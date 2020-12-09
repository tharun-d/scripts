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