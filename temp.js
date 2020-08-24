db.trainingpartner.find({ userName: "TP060611" }).forEach(x => {
    //daReviews
    len = x["daReviews"].length
    print("previous daReviews: ", x["daReviews"][len - 1]["daReport"])
    x["daReviews"][len - 1]["daReport"] = x["daReport"]
    print("updated daReviews: ", x["daReport"])

    db.trainingpartner.save(x)
})


db.tcregistrationrules.insert(
    {
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
                    "amount": 3000
                },
                "residentialInspection": {
                    "isPaymentRequired": "Yes",
                    "amount": 7500
                },
                "residentialUnBlocking": {
                    "isPaymentRequired": "Yes",
                    "amount": 2000
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

db.centreinspector.find({ "belongsTo": "akash1" }).forEach(data => {
    for (var i = 0; i < data["belongsTo"].length; i++) {
        if (data["belongsTo"][i] == "akash1") {
            data["belongsTo"][i] = "SCPWD"
            print(data["userName"])
        }
    }
    db.centreinspector.save(data)
})

db.qualitycontrol.find({ "belongsTo": "akash1" }).forEach(data => {
    for (var i = 0; i < data["belongsTo"].length; i++) {
        if (data["belongsTo"][i] == "akash1") {
            data["belongsTo"][i] = "SCPWD"
            print(data["userName"])
        }
    }
    db.qualitycontrol.save(data)
})

db.desktopassessor.find({ "belongsTo": "PI0006" }).forEach(data => {
    for (var i = 0; i < data["belongsTo"].length; i++) {
        if (data["belongsTo"][i] == "PI0006") {
            data["belongsTo"][i] = "IA_000001"
            print(data["userName"])
        }
    }
    db.desktopassessor.save(data)
})
db.tcworkflow.updateMany({ "assignedNextUser": "akash1" }, { "$set": { "assignedNextUser": "SCPWD" } })
db.tcworkflow.updateMany({ "actionTakenBy": "akash1" }, { "$set": { "actionTakenBy": "SCPWD" } })
db.users.remove({ userName: "akash1" })
db.ssc.remove({ userName: "akash1" })

db.trainingcentre.find({ status: { "$in": ["reRequest"] } }).forEach(data => {
    paymentsData = db.payments.find({ "requestMetadata.subscriptionDetails.referenceType": "CAAF Editing Fee", "isComplete": true, "userId": data["userName"] }).sort({ "date": -1 }).toArray()
    if (paymentsData.length > 0) {

        if (data["submittedOn"] < paymentsData[0]["date"]) {
            print("submittedOn: ", data["submittedOn"])
            print("date: ", paymentsData[0]["date"])
        }
    }

})

db.trainingcentre.find({ status: { "$in": ["paymentDoneForUpdateCaaf"] } }).forEach(data => {
    paymentsData = db.payments.find({ "requestMetadata.subscriptionDetails.referenceType": "CAAF Editing Fee", "isComplete": true, "userId": data["userName"] }).sort({ "date": -1 }).toArray()
    if (paymentsData.length > 0) {

        if (data["submittedOn"] > paymentsData[0]["date"]) {
            print("submittedOn: ", data["submittedOn"])
            print("date: ", paymentsData[0]["date"])
        }
    }

})

tcIds = [
    "TC013166",
    "TC040409",
    "TC040411",
    "TC040586",
    "TC040678",
    "TC040746",
    "TC046376",
    "TC056861",
    "TC056870",
    "TC057372",
    "TC057821",
    "TC060808",
    "TC105745",
    "TC107350",
    "TC128495",
    "TC128788"]

tcIds.forEach(data => {

    tcData = db.trainingcentre.findOne({ userName: data })
    dd = db.tcworkflow.find({ "tcId": data, "assignedNextUserRole": "Holding Agency", "migration": { "$exists": false }, "requestType": { "$exists": false } }).sort({ "actionTakenOn": -1 }).toArray()

    //print(tcData["trainingPartner"]["type"])
    //print(tcData["trainingCenterType"])
    if (dd.length > 0) {

        print(tcData["trainingCenterType"])

    }
})


tcIds = [
    "TC105745",
    "TC128495",
    "TC128788"
]

tcIds.forEach(data => {

    tcData = db.trainingcentre.findOne({ userName: data })
    dd = db.tcworkflow.find({ "tcId": data, "assignedNextUserRole": "Holding Agency", "migration": { "$exists": false }, "requestType": { "$exists": false } }).sort({ "actionTakenOn": -1 }).toArray()

    //print(tcData["trainingPartner"]["type"])
    //print(tcData["trainingCenterType"])
    if (dd.length > 0) {

        print("submittedOn: ", tcData["submittedOn"])
        print("date: ", dd[0]["createdOn"])

    }
})

db.trainingpartner.find({ isSmart: true, "daReviews.date": { $type: 2 } }).forEach(data => {

    for (var i = 0; i < data.daReviews.length; i++) {
        print(data["userName"])
        data.daReviews[i].date = new Date(data.daReviews[i].date)
    }
    db.trainingpartner.save(data)
})



db.tcworkflow.update({ "_id": ObjectId("5dc3d4ac1a1dae0436e48d4e"), "tcId": "TC102036" }, {
    "$set": {
        "assignedNextUserRole": "Inspection Agency",
        "assignedNextUser": "PQ0001",
        "otherInformation.centreinspection.proposeddate": ISODate("2019-11-13T00:00:00Z"),
        "otherInformation.centreinspection.ciuserName": "KULBHUSHAN.QACA",
        "otherInformation.centreinspection.qcuserName": "KARTIKEY_QACA_QC",
        "otherInformation.centreinspection.tcWorkflowID": "5dc3d4ac1a1dae0436e48d4e",
    }
})
db.trainingcentre.update({ userName: "TC030885" },
    { "$set": { "inspectionCenterDates.0.tcWorkflowID": "5dc3d4ac1a1dae0436e48d4e" } })


db.tcworkflow.update({ "_id": ObjectId("5dcd229940b4db041d31cfc3"), "tcId": "TC108125" }, {
    "$set": {
        "assignedNextUserRole": "Inspection Agency",
        "assignedNextUser": "PQ0001",
        "otherInformation.centreinspection.proposeddate": ISODate("2019-11-16T00:00:00Z"),
        "otherInformation.centreinspection.ciuserName": "CI_000001",
        "otherInformation.centreinspection.qcuserName": "KARTIKEY_QACA_QC",
        "otherInformation.centreinspection.tcWorkflowID": "5dcd229940b4db041d31cfc3",
    }
})


tcIds = [
    "TC129639",
    "TC127005",
    "TC126304",
    "TC124183",
    "TC122531",
    "TC121348",
    "TC119604",
    "TC116534",
    "TC116531",
    "TC116090",
    "TC113699",
    "TC113678",
    "TC112875",
    "TC112232",
    "TC111402",
    "TC111399",
    "TC111391",
    "TC110650",
    "TC109844",
    "TC109660",
    "TC109068",
    "TC108152",
    "TC107641",
    "TC107373",
    "TC107002",
    "TC106938",
    "TC105265",
    "TC104999",
    "TC104431",
    "TC104206",
    "TC045127",
    "TC061974",
    "TC048769",
    "TC001024",
    "TC049352",
    "TC058397",
    "TC053204",
    "TC048583",
    "TC060515",
    "TC060773",
    "TC049706",
    "TC057493",
    "TC040449",
    "TC038298",
    "TC058256",
    "TC040822",
    "TC060641",
    "TC051915",
    "TC054892",
    "TC050531",
    "TC018617",
    "TC060190",
    "TC054792",
    "TC060184",
    "TC060369",
    "TC056616",
    "TC040830",
    "TC041298",
    "TC060550",
    "TC058816",
    "TC044994",
    "TC060793",
    "TC057285",
    "TC056513",
    "TC035746",
    "TC054800",
    "TC031524",
    "TC042235",
    "TC058497",
    "TC059282",
    "TC041271",
    "TC053753",
    "TC045385",
    "TC042174",
    "TC048839",
    "TC044148",
    "TC040964",
    "TC062515",
    "TC063123",
    "TC059513",
    "TC045399",
    "TC038943",
    "TC052781",
    "TC041221",
    "TC059586",
    "TC060663",
    "TC044213",
    "TC037835",
    "TC037837",
    "TC044877",
    "TC045990",
    "TC059352",
    "TC000455",
    "TC041199",
    "TC050572",
    "TC058696",
    "TC059992",
    "TC013312",
    "TC000029",
    "TC061802",
    "TC051169",
    "TC051224",
    "TC038578",
    "TC040930",
    "TC028482",
    "TC041917",
    "TC054552",
    "TC054610",
    "TC059765",
    "TC041870",
    "TC030181",
    "TC049287",
    "TC060260",
    "TC062530",
    "TC057412",
    "TC043468",
    "TC060119",
    "TC014154",
    "TC055738",
    "TC041052",
    "TC054326",
    "TC000750",
    "TC003261",
    "TC059636",
    "TC055910",
    "TC035026",
    "TC054194",
    "TC028232",
    "TC016069",
    "TC018944",
    "TC023730",
    "TC019605",
    "TC033776",
    "TC028280",
    "TC001402",
    "TC002964",
    "TC042323",
    "TC043460",
    "TC054003",
    "TC041005",
    "TC040814",
    "TC052330",
    "TC059499",
    "TC044678",
    "TC060693",
    "TC040756",
    "TC048274",
    "TC060076",
    "TC062218",
    "TC056452",
    "TC013352",
    "TC057884",
    "TC046290",
    "TC040107",
    "TC051595",
    "TC040624",
    "TC011081",
    "TC004621",
    "TC056438",
    "TC009670",
    "TC032932",
    "TC003009",
    "TC053860",
    "TC002603",
    "TC053874",
    "TC058707",
    "TC004970",
    "TC061236",
    "TC060750",
    "TC049382",
    "TC058151",
    "TC049708",
    "TC028030",
    "TC004347",
    "TC031022",
    "TC050457",
    "TC062378",
    "TC062450",
    "TC058065",
    "TC058141",
    "TC055817",
    "TC044685",
    "TC020114",
    "TC018568",
    "TC061915",
    "TC047245",
    "TC044363",
    "TC055295",
    "TC047464",
    "TC047748",
    "TC058278",
    "TC040573",
    "TC058284",
    "TC012998",
    "TC052895",
    "TC047146",
    "TC041097",
    "TC041276",
    "TC040804",
    "TC019621",
    "TC006925",
    "TC040347",
    "TC012128",
    "TC039836",
    "TC007146",
    "TC018604",
    "TC026546",
    "TC025171",
    "TC025566",
    "TC005966",
    "TC022749",
    "TC010466",
    "TC012924",
    "TC030260",
    "TC040353",
    "TC019713",
    "TC009001",
    "TC028248",
    "TC012003",
    "TC008141",
    "TC031082",
    "TC007723",
    "TC036736",
    "TC018610",
    "TC033274",
    "TC005038",
    "TC015419",
    "TC020109",
    "TC005859",
    "TC007354",
    "TC001987",
    "TC015202",
    "TC002855",
    "TC004234",
    "TC007050",
    "TC007973",
    "TC001094",
    "TC002954",
    "TC003904",
    "TC000404",
    "TC002792",
    "TC001890"]

tcIds.forEach(data => {

    db.trainingcentre.find({ "userName": data }).forEach(tcData => {
        if (tcData["status"] == "paymentDoneForUpdateCaaf" || tcData["status"] == "appliedForUpdateCaaf") {
            tcData["status"] = "Rejected"

            db.trainingcentre.save(tcData)

        } else {
            print(data, tcData["status"])
        }
    })
})
