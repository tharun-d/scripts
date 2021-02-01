//TP
db.users.insert(
    {
        "email": "testingteam@transneuron.com",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "userName": "TP0004571",
        "role": "Training Partner",
        "phone": {
            "mobile": NumberLong(9986223869)
        },
        "status": "init",
        "created_at": ISODate("2019-12-27T06:36:01.973Z"),
        "updated_at": "Mon Feb 03 2020 14:33:25 GMT+0530 (IST)",
        "hasChangedDefPass": true,
        "employeeId": "",
        "aadhar": "",
        "loginAttempts": 0,
        "createdBy": {},
        "documentUrls": {},
        "passwordHistory": [
            {
                "password": "$2a$10$OzQpq5l6kpiI8N47eIoX9.V2niQXjY3Fn.Ra0V89a3x95E8pvGjMK",
                "changedOn": ISODate("2019-12-27T06:36:53.861Z")
            }
        ],
        "remarks": ""
    }

)

//TC
db.users.insert(
    {
        "email": "testingteam@transneuron.com",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "userName": "TC129546",
        "role": "Training Centre",
        "phone": {
            "mobile": NumberLong(9986223869)
        },
        "status": "init",
        "created_at": ISODate("2019-12-27T06:36:01.973Z"),
        "updated_at": "Mon Feb 03 2020 14:33:25 GMT+0530 (IST)",
        "hasChangedDefPass": true,
        "employeeId": "",
        "aadhar": "",
        "loginAttempts": 0,
        "createdBy": {},
        "documentUrls": {},
        "passwordHistory": [
            {
                "password": "$2a$10$OzQpq5l6kpiI8N47eIoX9.V2niQXjY3Fn.Ra0V89a3x95E8pvGjMK",
                "changedOn": ISODate("2019-12-27T06:36:53.861Z")
            }
        ],
        "remarks": ""
    }
)

db.users.updateMany({}, { "$set": { "status": "init", "loginAttempts": 0 } })
db.users.update({ userName: "KARTIKEY.QACA" }, {
    "$set": {
        "status": "init", "loginAttempts": 0, "phone.mobile": NumberLong("8010672472"), email: "kartikeydubey34@gmail.com"
    }
})

db.users.remove({ userName: "DA_000007" })

db.users.find({ "phone.mobile": { "$exists": true } })
db.users.insert(
    {
        "email": "testingteam@transneuron.com",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "userName": "DA_000007",
        "role": "Desktop Assessor",
        "phone": {
            "mobile": NumberLong(9986223869)
        },
        "status": "init",
        "created_at": ISODate("2019-12-27T06:36:01.973Z"),
        "updated_at": "Mon Feb 03 2020 14:33:25 GMT+0530 (IST)",
        "hasChangedDefPass": true,
        "employeeId": "",
        "aadhar": "",
        "loginAttempts": 0,
        "createdBy": {},
        "documentUrls": {},
        "passwordHistory": [
            {
                "password": "$2a$10$OzQpq5l6kpiI8N47eIoX9.V2niQXjY3Fn.Ra0V89a3x95E8pvGjMK",
                "changedOn": ISODate("2019-12-27T06:36:53.861Z")
            }
        ],
        "remarks": ""
    }
)

db.desktopassessor.insert(
    {
        "firstName": "Govind Prasad",
        "userName": "GAURAV_QACA_DA",
        "email": "Govind.prasad@imacs.net.in",
        "role": "Desktop Assessor",
        "password": "$2a$10$tugmOsB3JRjARNPPMUyPP.kR/igGwrEqC5TL6PCaX6TiC4lL1MR7G",
        "hasChangedDefPass": false,
        "phone": {
            "mobile": NumberLong(123456789)
        },
        "belogsTo": "IMAC",
        "migratedfrom": "SMART",
        "belongsTo": [
            "PI0006",
            "IMaCS_Inspector_0001"
        ]
    }

)

db.users.update({ userName: "TC770054" },
    {
        "$set": {
            "password": "jj",
            "hasChangedDefPass": true,
        }, "$push": {
            "passwordHistory": {
                "password": "ss",
                "changedOn": "",
            },
        }
    }
)
///

db.users.remove({ userName: "HARPREET.KAUR" })
db.pmkkspoc.remove({ userName: "HARPREET.KAUR" })



db.users.insert(
    {
        "email": "ankit.malani@nsdcindia.org",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "userName": "ankit.malani",
        "role": "PMKK SPOC",
        "phone": {
            "mobile": NumberLong(9599122759)
        },
        "status": "init",
        "created_at": new Date(),
        "updated_at": new Date(),
        "hasChangedDefPass": true,
        "employeeId": "",
        "aadhar": "",
        "loginAttempts": 0,
    }
)

db.pmkkspoc.insert(
    {
        "firstName": "Ankit Malani",
        "userName": "ankit.malani",
        "email": "ankit.malani@nsdcindia.org",
        "role": "PMKK SPOC",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "hasChangedDefPass": "FALSE",
        "phone": { "mobile": NumberLong("9599122759") },
        "status": "Active"
    }
)

db.users.insert(
    {
        "email": "sneha.suman@nsdcindia.org",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "userName": "sneha.suman",
        "role": "PMKK SPOC",
        "phone": {
            "mobile": NumberLong(8744949649)
        },
        "status": "init",
        "created_at": new Date(),
        "updated_at": new Date(),
        "hasChangedDefPass": true,
        "employeeId": "",
        "aadhar": "",
        "loginAttempts": 0,
    }
)

db.pmkkspoc.insert(
    {
        "firstName": "Sneha Suman",
        "userName": "sneha.suman",
        "email": "sneha.suman@nsdcindia.org",
        "role": "PMKK SPOC",
        "password": "$2a$10$Q.lPaaJzMSJdrnlVwsSRlefuBetQGdoH5F8kaAghufXveV3zqJ/cO",
        "hasChangedDefPass": "FALSE",
        "phone": { "mobile": NumberLong("8744949649") },
        "status": "Active"
    }
)