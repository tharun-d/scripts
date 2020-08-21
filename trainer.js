
// Removing Trainer script
associatedTrainer = []
db.trainingcentre.find({ userName: "TC058421" }).forEach(x => {
    x["jobRoles"].forEach(y => {
        count = 0
        if (y["qp"] == "CON/Q0602") {
            y["associatedTrainer"].forEach(z => {
                if (z["userName"] != "518935") {
                    associatedTrainer.push(y["associatedTrainer"][count])
                } else {
                    print("removing : " + z["userName"])
                }
                count = count + 1
            })
        }
    })
    db.trainingcentre.update({
        userName: "TC058421",
        "jobRoles.qp": "CON/Q0602"
    }, { "$set": { "jobRoles.$.associatedTrainer": associatedTrainer } })
})


db.trainer.update({ userName: "T-01559D" },
    { $set: { "jobRoles.1.certificateDetails.certificateStatus": "APPROVED", "jobRoles.1.isCertified": true } })

// FOR ACCrediated job role trainer cant be provisional
db.trainer.update({ userName: "T-015D2F" },
    { $set: { "jobRoles.1.certificateDetails.certificateStatus": "PROVISIONAL", "jobRoles.1.isCertified": true } })


//FOR ACCrediated for that qp
db.trainer.update({ userName: "T-01559D" },
    {
        $set: {
            "isCertified": true,
            "jobRoles.1.certificateDetails.certificateValidTillDate": { "$lte": Date() },
            "jobRoles.1.assmtCrt.grade": { "$in": ["A", "B"] }
        }
    })

db.trainer.update({ userName: "DTR118932" },
    {
        $set: {
            email: "pooja.v@transneuron.com",
            phone: NumberLong("7892463800"),
        }
    }
)

db.trainingcentre.find({ userName: "TC049376" }).forEach(x => {
    x['jobRoles'].forEach(jr => {
        if (jr.qp == "AMH/Q1947") {
            jr['associatedTrainer'].push({
                "userName": "TR122854",
                "trainerName": "Meera Shrivastav"
            })
        }
    })
    db.trainingcentre.save(x)
})
var mc = db.smartmessagecenter.findOne({ "tcid": "TC049376" })
if (mc) {

    var stage = {
        "stage": "TR122854 trainer has been added to jobrole AMH/Q194 based on SR SR-3555",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    db.smartmessagecenter.save(mc)
}

db.trainingcentre.find({ userName: "TC109349" }).forEach(x => {
    x['jobRoles'].forEach(jr => {
        if (jr.qp == "SSC/Q0503") {
            jr['associatedTrainer'].push({
                "userName": "TR116824",
                "trainerName": "Sangeeta Bardhan"
            })
            jr['associatedTrainer'].push({
                "userName": "TR116855",
                "trainerName": "Rajashree Bhattacharya"
            })
        }
        if (jr.qp == "SSC/Q6702") {
            jr['associatedTrainer'].push({
                "userName": "TR116824",
                "trainerName": "Sangeeta Bardhan"
            })
            jr['associatedTrainer'].push({
                "userName": "TR116855",
                "trainerName": "Rajashree Bhattacharya"
            })
        }
    })
    db.trainingcentre.save(x)
})
var mc = db.smartmessagecenter.findOne({ "tcid": "TC109349" })
if (mc) {

    var stage = {
        "stage": "TR116824,TR116855 trainers has been added to job role SSC/Q0503 and SSC/Q6702 based on SR SR-3628",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    db.smartmessagecenter.save(mc)
}