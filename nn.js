db.cmStatusLog.aggregate([
    { "$match": { "notificationSent": true } },
    {
        "$lookup":
        {
            from: "trainingcentre",
            localField: "tcUserName",
            foreignField: "userName",
            as: "tcData",
        },
    },
])

db.cmStatusLog.aggregate([
    { "$match": { "notificationSent": true } },
    {
        "$lookup":
        {
            from: "trainingcentre",
            localField: "tcUserName",
            foreignField: "userName",
            as: "tcData",
        },
    },
    {
        "$project":
        {
            "userName": { "$arrayElemAt": ["$tcData.userName", 0] },
            "schemeIDs": { "$arrayElemAt": ["$tcData.jobRoles.scheme.schemeId", 0] }
        }
    },
])


count = 0
db.trainingcentre.find({ "centerStaff": { "$exists": true } }, { "centerStaff": 1, "userName": 1 }).forEach(x => {
    for (var i = 0; i < x['centerStaff'].length; i++) {
        if (i != 0) {
            if (x['centerStaff'][i]['type'] == "Placement Coordinator") {
                print(x["userName"])
                count = count + 1
            }
        }
    }
})
print(count)
//

count = 0
db.trainingcentre.find({ "centerStaff": { "$exists": true } }, { "centerStaff": 1, "userName": 1 }).forEach(x => {
    plc = 0
    for (var i = 0; i < x['centerStaff'].length; i++) {
        if (x['centerStaff'][i]['type'] == "Placement Coordinator") {
            plc = plc + 1
        }
    }
    if (plc > 1) {
        centerStaff = []
        notPushed = true
        for (var i = 0; i < x['centerStaff'].length; i++) {
            print(notPushed)
            if (x['centerStaff'][i]['type'] == "Placement Coordinator") {
                if (notPushed) {
                    centerStaff.push(x['centerStaff'][i])
                    notPushed = false
                }
            } else {
                centerStaff.push(x['centerStaff'][i])
            }

        }
        // print(x["userName"])
        // print(centerStaff)
        db.trainingcentre.update({ "userName": x["userName"] }, { "$set": { "centerStaff": centerStaff } })
        count = count + 1
    }
})
print(count)

db.tcregistrationrules.update({ status: "active", "rulesForType.type": "Reg" },
    {
        "$set": {
            "rulesForType.$.continuousMonitoring.amount": 16000
        }
    })



db.trainingcentre.update({ userName: "TC129546" },
    { "$set": { "jobRoles.$[].status": "inspectionRequest", "inspectionProcess": "start", "tcstatus": "inspectionRequest" } })


db.tcworkflow.find({ status: "DAASSIGNED", assignedNextUserRole: "Inspection Agency" }).forEach(x => {
    data = db.tcworkflow.find({ tcId: x["tcId"], assignedNextUserRole: "Desktop Assessor" }).sort({ "_id": -1 }).limit(1).toArray()
    if (data[0]["status"] != "DAASSIGNED") {
        print(x["tcId"])
        x["status"] = data[0]["status"]
        x["actionTakenOn"] = data[0]["actionTakenOn"]
        db.tcworkflow.save(x)
    }
})



db.cmStatusLog.remove({ "insertedManually": true })
db.cmStatusLog.updateMany({ "notificationSent": true }, { "$set": { "marksAwarded": true } })
db.trainingcentre.find({ "processType": "Accreditation & Affiliation", "continuousMonitoringPayment": "success" }).limit(50).forEach(data => {
    paymentsData = db.payments.find({
        userId: data["userName"], "requestMetadata.subscriptionDetails.referenceType": "Continuous Monitoring Fee", "isComplete": true,
        "responseMetadata.trans_date": { "$exists": true },
    }).sort({ "_id": -1 }).limit(1).toArray()
    count = db.cmStatusLog.find({ "tcUserName": data["userName"] }).count()
    if (count == 0) {
        cmStatusLog = {}
        cmStatusLog["_id"] = new ObjectId()
        cmStatusLog["insertedManually"] = true
        cmStatusLog["tcUserName"] = data["userName"]
        cmStatusLog["tpUserName"] = data["trainingPartner"]["userName"]
        cmStatusLog["year"] = 2020
        cmStatusLog["quarterNumber"] = 1
        print(paymentsData.length)
        if (paymentsData && paymentsData.length > 0 && paymentsData[0] && paymentsData[0]["responseMetadata"]["trans_date"]) {
            cmStatusLog["paymentDate"] = paymentsData[0]["responseMetadata"]["trans_date"]
        }
        var notificationDate = new Date(paymentsData[0]["responseMetadata"]["trans_date"].getTime() + (90 * 24 * 60 * 60 * 1000))
        cmStatusLog["notificationDate"] = notificationDate
        var quarterEndDate = new Date(cmStatusLog["notificationDate"].getTime() + (90 * 24 * 60 * 60 * 1000))
        cmStatusLog["dateCreated"] = new Date()
        cmStatusLog["quarterEndDate"] = quarterEndDate
        cmStatusLog["notificationSent"] = false
        cmStatusLog["marksAwarded"] = false
        cmStatusLog["skippedThisQuarter"] = false
        cmStatusLog["tcCompleted"] = false
        db.cmStatusLog.insert(cmStatusLog)
    } else {
        cmStatusLog = {}
        cmStatusLog["_id"] = new ObjectId()
        cmStatusLog["insertedManually"] = true
        cmStatusLog["tcUserName"] = data["userName"]
        cmStatusLog["tpUserName"] = data["trainingPartner"]["userName"]
        cmStatusLog["year"] = 2020
        cmStatusLog["quarterNumber"] = 2
        if (paymentsData && paymentsData.length > 0 && paymentsData[0] && paymentsData[0]["responseMetadata"]["trans_date"]) {
            cmStatusLog["paymentDate"] = paymentsData[0]["responseMetadata"]["trans_date"]
        }
        cmStatusLog["dateCreated"] = new Date()
        cmStatusLog["notificationDate"] = new Date()
        var quarterEndDate = new Date(cmStatusLog["notificationDate"].getTime() + (90 * 24 * 60 * 60 * 1000))
        cmStatusLog["quarterEndDate"] = quarterEndDate
        cmStatusLog["notificationSent"] = false
        cmStatusLog["marksAwarded"] = false
        cmStatusLog["skippedThisQuarter"] = false
        cmStatusLog["tcCompleted"] = false
        db.cmStatusLog.insert(cmStatusLog)
    }
})