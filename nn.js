finalToRemove = []
tcIDs = db.cmStatusLog.distinct("tcUserName", { quarterNumber: 3 })
tcIDs.forEach(x => {
    count = db.cmStatusLog.find({ "tcUserName": x, quarterNumber: 3 }).count()
    if (count > 1) {
        var obj = {}
        obj["tcId"] = x
        obj["count"] = count
        finalToRemove.push(obj)
    }
})

finalToRemove.forEach(data => {
    for (let index = 1; index < data["count"]; index++) {
        db.cmStatusLog.remove({ tcUserName: data["tcId"], quarterNumber: 3 }, true)
    }
})

//
finalToRemove = []
tcIDs = db.cmworkflow.distinct("tcId", { quarterNumber: 3 })
tcIDs.forEach(x => {
    count = db.cmworkflow.find({ "tcId": x, quarterNumber: 3 }).count()
    if (count > 1) {
        var obj = {}
        obj["tcId"] = x
        obj["count"] = count
        finalToRemove.push(obj)
    }
})

finalToRemove.forEach(data => {
    for (let index = 1; index < data["count"]; index++) {
        db.cmworkflow.remove({ tcId: data["tcId"], quarterNumber: 3 }, true)

    }
})

//
finalToRemove = []
tcIDs = db.tccontinuousmonitoring.distinct("userName", { quarterNumber: 3 })
tcIDs.forEach(x => {
    count = db.tccontinuousmonitoring.find({ "userName": x, quarterNumber: 3 }).count()
    if (count > 1) {
        var obj = {}
        obj["tcId"] = x
        obj["count"] = count
        finalToRemove.push(obj)
    }
})

finalToRemove.forEach(data => {
    for (let index = 1; index < data["count"]; index++) {
        db.tccontinuousmonitoring.remove({ userName: data["tcId"], quarterNumber: 3 }, true)

    }
})

db.cmStatusLog.createIndex({ "tcUserName": 1, "quarterNumber": 1 }, { unique: true })
db.cmworkflow.createIndex({ "tcId": 1, "quarterNumber": 1 }, { unique: true })
db.tccontinuousmonitoring.createIndex({ "userName": 1, "quarterNumber": 1 }, { unique: true })

db.trainingpartner.find({ panStatus: "New Request" }).forEach(data => {
    count = db.tpworkflowforpan.find({ tpId: data["userName"] }).count()
    if (count == 0) {
        db.trainingpartner.update({"userName":data["userName"]},{
            "$unset":{
                "panStatus":"",
                "panSubmittedOn":"",
                "panCard":"",
                "panDocument":"",
            }
        })
    }
})