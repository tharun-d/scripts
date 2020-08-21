db.tccontinuousmonitoring.remove({})
db.tccontinuousmonitoring.insert(
    {
        "userName": "TC920028",
        "year": 2020,
        "quarterNumber": 1,
        "createdOn": ISODate("2020-04-17T04:52:59.196Z"),
        "updatedOn": ISODate("2020-04-17T04:52:59.196Z"),
        "jobRoleSpecificStandard": {
            "qp": "AMH/Q1201",
            "equipment": {
                "equipemntPhotos": [
                    {
                        "tcimgurl": "bucket/helloo",
                        "longitude": "10.30",
                        "latitude": "9.30"
                    }, {
                        "tcimgurl": "bucket/helloo",
                        "longitude": "10.30",
                        "latitude": "9.30"
                    }
                ]
            },
            "laboratory": {
                "serialNumber": "HYBRID_1",
                "laboratoryPhotos": [
                    {
                        "tcimgurl": "bucket/helloo",
                        "longitude": "10.30",
                        "latitude": "9.30"
                    }, {
                        "tcimgurl": "bucket/helloo",
                        "longitude": "10.30",
                        "latitude": "9.30"
                    }
                ]
            },
            "classRoom": {
                "serialNumber": "CLASS_1",
                "classRoomPhotos":
                {
                    "tcimgurl": "bucket/helloo",
                    "longitude": "10.30",
                    "latitude": "9.30"
                }
            }
        },
        "commonStandard": {
            "reception": {
                "tcimgurl": "bucket/helloo",
                "longitude": "10.30",
                "latitude": "9.30"
            },
            "maleWashroom": {
                "tcimgurl": "bucket/helloo",
                "longitude": "10.30",
                "latitude": "9.30"
            },
            "firstAidBox": {
                "tcimgurl": "bucket/helloo",
                "longitude": "10.30",
                "latitude": "9.30"
            },
        },
        "gradingParameter": {
            "frontView": {
                "tcimgurl": "bucket/helloo",
                "longitude": "10.30",
                "latitude": "9.30"
            },
            "lift": {
                "tcimgurl": "bucket/helloo",
                "longitude": "10.30",
                "latitude": "9.30"
            },
        },
    }
)

db.tccontinuousmonitoring.insert(
    {
        "userName": "TC920028",
        "year": 2020,
        "quarterNumber": 1,
        "createdOn": ISODate("2020-04-28T06:25:00.456Z"),
        "updatedOn": ISODate("2020-04-28T06:25:00.456Z"),
        "jobRoleSpecificStandard": {
            "qp": "RAS/Q0104",
            "laboratory": {
                "serialNumber": "LAB_1"
            },
            "classRoom": {
                "serialNumber": "CLASS_1"
            },
            "tcCompleted": false
        },
        "commonStandard": {
            "tcCompleted": false
        },
        "gradingParameter": {
            "tcCompleted": false
        }
    }
)

db.tccontinuousmonitoring.find({"userName": "TC600002"})