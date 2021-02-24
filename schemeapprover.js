db.schemeapprover.insert(
    {
        "userName": "SEK00001",
        "email": "sak.nsdc@nsdcindia.org",
        "firstName": "Irshad Yatoo",
        "status": "Active",
        "schemeId": 31,
        "role": "Scheme Approver",
        "phone": {
            "mobile": NumberLong("9654870928")
        },
        "createdOn": new Date()
    }
)

/////

db.smartschemes.insert({
    "schemeId": 31,
    "schemeName": "Seekho Aur Kamao (Learn & Earn)” Scheme for J&K and Ladakh",
    "recommendedBy": "National Skill Development Corporation (NSDC)"
})

///

db.users.insert(
    {
        "firstName": "Irshad Yatoo",
        "userName": "SEK00001",
        "email": "sak.nsdc@nsdcindia.org",
        "role": "Scheme Approver",
        "password": "$2a$10$KRvuR8GFlMX.v8gScfwDkuo6wOwaW/ah1DH9DJ3Ky5R5oa3AQrxvm",
        "phone": {
            "mobile": NumberLong("9654870928")
        },
        "createdOn": new Date(),
        "loginAttempts": 0
    }
)