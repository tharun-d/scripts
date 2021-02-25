db.tcregistrationrules.remove({ status: "active" })
db.tcregistrationrules.insert(
    {
        "_id": ObjectId("5e4ab65fefa96db3871d6bc6"),
        "ruleId": 57,
        "adminRole": "smart",
        "refundRules": {
            "percentageOnRefusalOfCenterInspection": [
                {
                    "noOfDaysBeforeInspectionDate": 7,
                    "percentage": 70
                },
                {
                    "noOfDaysBeforeInspectionDate": 3,
                    "percentage": 30
                },
                {
                    "percentage": 10
                }
            ],
            "percentageOfRefundInCenterInspection": [
                {
                    "status": "InspectionDateAccepted",
                    "percentage": 30
                },
                {
                    "status": "InspectionDateRejected",
                    "percentage": 100
                },
                {
                    "status": "InspectionDateNotAccepted",
                    "percentage": 100
                },
                {
                    "status": "InspectionDateAssigned",
                    "percentage": 75
                }
            ],
            "refundOnDNRIfTCDoesnotReapply": 50,
            "refundOnBeforeDRIfTCDapply": 100,
            "refundOnBeforeDRIfTCDapplyAfterFirstTime": 50,
            "percentageOfRefundInAppeal": [
                {
                    "status": "Appeal Pmu Rejected",
                    "percentage": 100
                }
            ]
        },
        "rulesForType": [
            {
                "type": "Reg",
                "accredation": {
                    "isPaymentRequired": "Yes",
                    "amount": 6000
                },
                "registration": {
                    "isPaymentRequired": "Yes",
                    "amount": 3000
                },
                "continuousMonitoring": {
                    "isPaymentRequired": "Yes",
                    "amount": 8000
                },
                "unBlocking": {
                    "isPaymentRequired": "Yes",
                    "amount": 2000
                },
                "perJobRoleAffiliation": {
                    "isPaymentRequired": "Yes",
                    "amount": 1000
                },
                "inspectionFee": {
                    "isPaymentRequired": "Yes",
                    "amount": 10000
                },
                "appeal": {
                    "isPaymentRequired": "Yes",
                    "amount": 10000
                },
                "residentialRegistration": {
                    "isPaymentRequired": "Yes",
                    "amount": 3000.0
                },
                "residentialInspection": {
                    "isPaymentRequired": "Yes",
                    "amount": 10000.0
                },
                "residentialUnBlocking": {
                    "isPaymentRequired": "Yes",
                    "amount": 2000.0
                }
            },
            {
                "type": "Government",
                "registration": {
                    "isPaymentRequired": "No",
                    "amount": 3000
                },
                "accredation": {
                    "isPaymentRequired": "No",
                    "amount": 1000
                },
                "continuousMonitoring": {
                    "isPaymentRequired": "No"
                },
                "unBlocking": {
                    "isPaymentRequired": "No",
                    "amount": 1000
                },
                "perJobRoleAffiliation": {
                    "isPaymentRequired": "No",
                    "amount": 1
                },
                "inspectionFee": {
                    "isPaymentRequired": "No",
                    "amount": 1
                },
                "appeal": {
                    "isPaymentRequired": "No",
                    "amount": 1000
                },
                "residentialRegistration": {
                    "isPaymentRequired": "No",
                    "amount": 3000.0
                },
                "residentialInspection": {
                    "isPaymentRequired": "No",
                    "amount": 10000.0
                },
                "residentialUnBlocking": {
                    "isPaymentRequired": "No",
                    "amount": 2000.0
                }
            }
        ],
        "actionsAndNotifications": {
            "noOfBlockAttempts": 7,
            "durationOfBlock": 8,
            "noOfDaysInAdvanceInspectionDateNotifications": 70,
            "noOfDaysForOnsiteInspectionAfterDeemedReady": 20,
            "noOfDaysForInspectionAgencyReplyBackOnAssessment": 8
        },
        "review": [
            {
                "userName": "SmartAdmin2",
                "userRole": "Smart Admin",
                "status": "Approved"
            },
            {
                "userName": "NSDCADMIN1",
                "userRole": "NSDCAdmin",
                "status": "Approved"
            }
        ],
        "pendingOn": {

        },
        "status": "active",
        "refundOnBeforeDRIfTCDapplyAfterFirstTime": 75
    }
)