db.trainingcentre.find({ "processType": "Accreditation & Affiliation" }).forEach(x => {
    if (x["status"] == "Approved" || x["status"] == "Qualified" || x["status"] == "Not Qualified") {
        x["applicableForNewGrading"] = false
    }
    db.trainingcentre.save(x)
})

db.trainingcentre.find({ userName: "TC106421" }, { "applicableForNewGrading": 1 }).pretty()

db.trainingcentre.update({ userName: "TC106421" }, { "$set": { "applicableForNewGrading": false } })