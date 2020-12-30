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
            "rulesForType.$.continuousMonitoring.amount": 12000
        }
    })



db.trainingcentre.update({ userName: "TC129546" },
    { "$set": { "jobRoles.$[].status": "inspectionRequest", "inspectionProcess": "start", "tcstatus": "inspectionRequest" } })

tcVal = db.trainingcentre.findOne({ userName: "TC129546" })
var IAworkflow = {
    "_id": new ObjectId(),
    "tcId": "TC061896",
    "status": "inspectionRequest",
    "reqID": "Req1",
    "zone": tcVal["address"]["zone"],
    "state": tcVal["address"]["state"]["name"],
    "addressLine": tcVal["address"]["addressLine"],
    "district": tcVal["address"] && tcVal["address"]["district"] && tcVal["address"]["district"]["name"],
    "createdOn": ISODate("2020-12-04T11:30:57.360Z"),
    "actionTakenOn": ISODate("2020-12-04T11:30:57.360Z"),
    "assignedNextUser": "PI0006",
    "assignedNextUserRole": "Inspection Agency",
    "spoc": tcVal["spoc"],
    "trainingCentreName": tcVal["trainingCentreName"],
    "trainingPartnerName": tcVal["trainingPartner"]["name"],
    "trainingPartnerID": tcVal["trainingPartner"]["userName"],
    "trainingCenterType": tcVal["trainingCenterType"],
    "createdBy": "mongoscript",
}
db.tcworkflow.insert(IAworkflow)