
var equipmentsNames = []
var finalEquipments = []
db.trainingcentre.find({ "userName": "TC054253", "jobRoles.qp": "AMH/Q1210" }, { "jobRoles.$.equipemnts": 1 }).forEach(tc => {
    print(tc.jobRoles[0].equipemnts.length)
    for (var i = 0; i < tc.jobRoles[0].equipemnts.length; i++) {
        if (equipmentsNames.indexOf(tc.jobRoles[0].equipemnts[i].eqptName) === -1) {
            finalEquipments.push(tc.jobRoles[0].equipemnts[i])
            equipmentsNames.push(tc.jobRoles[0].equipemnts[i].eqptName)
        }
    }
    db.trainingcentre.update({ userName: "TC054253", "jobRoles.qp": "AMH/Q1210" },
        { "$set": { "jobRoles.$.equipemnts": finalEquipments } })
})

function qpUpdationWithEuip() {
    var cnt = 0;
    printjson("Script started*************************")
    var equips = db.getCollection('equimentdetails_Aug_10').find({}, { _id: 0, eqptName: 1, unitType: 1, description: 1, minQtyReq: 1, mandatoryEqptAvailableToTC: 1, QPCode: 1 }).toArray()
    grpByQPcode = {};
    for (var i = 0; i < equips.length; i++) {
        if (!grpByQPcode[equips[i].QPCode]) {
            grpByQPcode[equips[i].QPCode] = [equips[i]];
        } else {
            for (var j = 0; j < grpByQPcode[equips[i].QPCode].length; j++) {
                if (grpByQPcode[equips[i].QPCode][j]['eqptName'] == equips[i].eqptName) {
                    break;
                }
                if (j == grpByQPcode[equips[i].QPCode].length - 1) {
                    grpByQPcode[equips[i].QPCode].push(equips[i]);
                }
            }
        }
    }
    for (qpKey in grpByQPcode) {
        db.getCollection('qps').updateMany({ "qpCode": qpKey }, { "$set": { "eqptDetails": grpByQPcode[qpKey], "isEqpUptd": true } });
        printjson(cnt++)
    }

    printjson("Script done__________________________________!")
}



db.getCollection('equimentdetails_Aug_10').find({}, {
    _id: 0, eqptName: 1, unitType: 1,
    description: 1, minQtyReq: 1, for20Trainees: 1, for25Trainees: 1,
    for30Trainees: 1, mandatoryEqptAvailableToTC: 1, QPCode: 1
}).forEach(x => {
    db.qps.updateMany({ "qpCode": x["QPCode"], "eqptDetails.eqptName": x["eqptName"] },
        {
            $set: {
                "eqptDetails.$[jobRole].eqptID": new ObjectId().toString(),
                "eqptDetails.$[jobRole].minQtyReq": x["minQtyReq"],
                "eqptDetails.$[jobRole].minEquipReq.for20Trainees": x["for20Trainees"],
                "eqptDetails.$[jobRole].minEquipReq.for25Trainees": x["for25Trainees"],
                "eqptDetails.$[jobRole].minEquipReq.for30Trainees": x["for30Trainees"],
                "eqptDetails.$[jobRole].mandatoryEqptAvailableToTC": x["mandatoryEqptAvailableToTC"],
                "eqptDetails.$[jobRole].unitType": x["unitType"],
                "eqptDetails.$[jobRole].status": "Active",
                "eqptDetails.$[jobRole].updatedOn": new Date(),
                "updatedOn": new Date()
            }
        },
        { arrayFilters: [{ 'jobRole.eqptName': x['eqptName'] }] }
    )
})

db.qps.find({}).forEach(data => {
    if (data["eqptDetails"]) {
        for (var i = 0; i < data["eqptDetails"].length; i++) {
            data["eqptDetails"][i]["eqptID"] = new ObjectId().str
            data["eqptDetails"][i]["status"] = "Active"
            data["eqptDetails"][i]["updatedOn"] = new Date()
            data["eqptDetails"][i]["createdOn"] = new Date()
        }
        data["equipmentStatus"] = "Active"
    }
    db.qps.save(data)
})

db.qps.updateMany({}, { "$unset": { "eqptDetails": "" } })
db.qps.find({ "qpCode": { "$exists": true } }).forEach(y => {
    var eqptDetails = []
    db.equimentdetails_Aug_21.find({ "QPCode": y["qpCode"] }).forEach(x => {
        var object = {}
        var minEquipReq = {}
        object["QPCode"] = y["qpCode"]
        object["eqptID"] = new ObjectId().str
        if (x['eqptName']) {
            object["eqptName"] = x['eqptName']
        }
        if (x['minQtyReq']) {
            object["minQtyReq"] = x["minQtyReq"]
        }
        if (x['unitType']) {
            object["unitType"] = x["unitType"]
        }
        if (x['mandatoryEqptAvailableToTC']) {
            object["mandatoryEqptAvailableToTC"] = x["mandatoryEqptAvailableToTC"]
        }
        if (x['for20Trainees']) {
            minEquipReq["for20Trainees"] = x["for20Trainees"]
        }
        if (x['for25Trainees']) {
            minEquipReq["for25Trainees"] = x["for25Trainees"]
        }
        if (x['for30Trainees']) {
            minEquipReq["for30Trainees"] = x["for30Trainees"]

        }
        object["minEquipReq"] = minEquipReq
        object["status"] = "Active"
        object["updatedOn"] = new Date()
        object["createdOn"] = new Date()

        eqptDetails.push(object);
    })
    db.qps.update({ "_id": y["_id"] }, { "$set": { "eqptDetails": eqptDetails } })
})


count = 0
db.qps.aggregate([
    { "$project": { "isActive": 1, "status": 1, "eqptDetails": 1, "qpCode": 1, "nsqfLevel": 1, "jobRole": 1, "sectors.sectorName": 1 } },
    { "$unwind": "$eqptDetails" },
    {
        "$match": {
            "isActive": true,
            "status.statusID": { "$in": ["6", "8"] },
            "eqptDetails.status": { "$in": ["Active", ""] },
        }
    },
    { "$sort": { "eqptDetails.createdOn": -1 } },

]).forEach(data => {
    count = count + 1
})
print(count)

db.qps.find({ "qpCode": /BWS/ }).forEach(x => {


    if (x["eqptDetails"]) {
        for (let index = 0; index < x["eqptDetails"].length; index++) {
            x["eqptDetails"][index]["status"] = "Active"
        }
    }

})

db.qps.updateMany({
    "qpCode": {
        $in: [
            "BWS/Q3001",
            "BWS/Q3003",
            "BWS/Q2203",
            "BWS/Q2201",
            "BWS/Q0104",
            "BWS/Q0102",
            "BWS/Q0101",
            "BWS/Q0202",
            "BWS/Q0301",
            "BWS/Q0201",
            "BWS/Q0402",
            "BWS/Q4001",
            "BWS/Q0401",
            "BWS/Q1001",
            "BWS/Q2303",
            "BWS/Q2301",
            "BWS/Q0205",
            "BWS/Q1002",
            "BWS/Q0403",
            "BWS/Q2302",
            "BWS/Q2205"
        ]
    }
}, {
    "$unset": {
        "eqptDetails": ""
    }
})
db.qps.find({
    "qpCode": {
        $in: [
            "BWS/Q3001",
            "BWS/Q3003",
            "BWS/Q2203",
            "BWS/Q2201",
            "BWS/Q0104",
            "BWS/Q0102",
            "BWS/Q0101",
            "BWS/Q0202",
            "BWS/Q0301",
            "BWS/Q0201",
            "BWS/Q0402",
            "BWS/Q4001",
            "BWS/Q0401",
            "BWS/Q1001",
            "BWS/Q2303",
            "BWS/Q2301",
            "BWS/Q0205",
            "BWS/Q1002",
            "BWS/Q0403",
            "BWS/Q2302",
            "BWS/Q2205"
        ]
    }
}).forEach(y => {
    var eqptDetails = []
    db.equimentdetails_Nov_23.find({
        "QPCode": y["qpCode"]
    }).forEach(x => {
        print(y["qpCode"])
        var object = {}
        var minEquipReq = {}
        object["QPCode"] = y["qpCode"]
        object["eqptID"] = new ObjectId().str
        if (x['eqptName']) {
            object["eqptName"] = x['eqptName']
        }
        if (x['minQtyReq']) {
            object["minQtyReq"] = x["minQtyReq"]
        }
        if (x['unitType']) {
            object["unitType"] = x["unitType"]
        }
        if (x['mandatoryEqptAvailableToTC']) {
            object["mandatoryEqptAvailableToTC"] = x["mandatoryEqptAvailableToTC"]
        }
        if (x['for20Trainees']) {
            minEquipReq["for20Trainees"] = x["for20Trainees"]
        }
        if (x['for25Trainees']) {
            minEquipReq["for25Trainees"] = x["for25Trainees"]
        }
        if (x['for30Trainees']) {
            minEquipReq["for30Trainees"] = x["for30Trainees"]
        }
        object["minEquipReq"] = minEquipReq
        object["status"] = "Active"
        object["updatedOn"] = new Date()
        eqptDetails.push(object);
    })
    db.qps.updateMany({
        "qpCode": y["qpCode"]
    }, {
        "$set": {
            "eqptDetails": eqptDetails
        }
    })
})

db.qps.find({}).forEach(x => {
    if (x["eqptDetails"]) {
        for (let index = 0; index < x["eqptDetails"].length; index++) {
            if (x["eqptDetails"][index]["minEquipReq"] &&
                x["eqptDetails"][index]["minEquipReq"]["for30Trainees"] &&
                x["eqptDetails"][index]["minEquipReq"]["for30Trainees"] != "") {
                x["eqptDetails"][index]["minQtyReq"] = x["eqptDetails"][index]["minEquipReq"]["for30Trainees"]
            }
        }
    }
    db.qps.save(x)
})


db.qps.updateMany(
    {
        "equipmentStatus": { "$in": ["Active", "Submitted"] }, "eqptDetails": { "$exists": true }
    },
    {
        "$set":
            { "equipmentStatus": "Active", "eqptDetails.$[].status": "Active" }
    })