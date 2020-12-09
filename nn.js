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