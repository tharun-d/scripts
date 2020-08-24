
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
            data["eqptDetails"][i]["eqptID"] = new ObjectId().toString()
            data["eqptDetails"][i]["status"] = "Active"
            data["eqptDetails"][i]["updatedOn"] = new Date()
            data["eqptDetails"][i]["createdOn"] = new Date()
        }
        data["equipmentStatus"] = "Active"
    }
    db.qps.save(data)
})