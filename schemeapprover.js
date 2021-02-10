db.schemeapprover.insert(
    {
        "userName": "CSR00001",
        "email": "twinkle.sehgal@nsdcindia.org",
        "firstName": "Twinkle Sehgal",
        "status": "Active",
        "schemeId": 28,
        "role": "Scheme Approver",
        "phone": {
            "mobile": NumberLong("8744949649")
        },
        "createdOn": new Date()
    }
)

/////

db.smartschemes.insert({
    "schemeId": 28,
    "schemeName": "NSDC CSR",
    "recommendedBy": "NSDC CSR Team"
})

///

db.users.insert(
    {
        "firstName": "Mr. Avnish Jain",
        "userName": "CSR00001",
        "email": "twinkle.sehgal@nsdcindia.org",
        "role": "Scheme Approver",
        "password": "$2a$10$KRvuR8GFlMX.v8gScfwDkuo6wOwaW/ah1DH9DJ3Ky5R5oa3AQrxvm",
        "phone": {
            "mobile": NumberLong("8744949649")
        },
        "createdOn": new Date(),
        "loginAttempts": 0
    }
)