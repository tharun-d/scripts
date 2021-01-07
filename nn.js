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



