db.ssc.updateMany({ "sector.name": "Automotive" }, { $set: { "sscName": "Automotive Skills Development Council" } })
db.ssc.updateMany({ "sector.name": "Apparel" }, { $set: { "sscName": "Apparel, Madeups & Home Furnishing Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Aerospace and Aviation" }, { $set: { "sscName": "Aerospace and Aviation Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Beauty & Wellness" }, { $set: { "sscName": "Beauty & Wellness Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "BFSI" }, { $set: { "sscName": "Banking, Financial Services & Insurance (BFSI) Sector Skill Council of India" } })
db.ssc.updateMany({ "sector.name": "Capital Goods" }, { $set: { "sscName": "Capital Goods Skill Council" } })
db.ssc.updateMany({ "sector.name": "Coating & Painting" }, { $set: { "sscName": "Paints and Coatings Skill Council" } })
db.ssc.updateMany({ "sector.name": "Construction" }, { $set: { "sscName": "Construction Skill Development Council of India" } })
db.ssc.updateMany({ "sector.name": "Domestic Workers" }, { $set: { "sscName": "Domestic Workers Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Electronics" }, { $set: { "sscName": "Electronic Sector Skill Council of India" } })
db.ssc.updateMany({ "sector.name": "Food Processing" }, { $set: { "sscName": "Food Industry Capacity & Skill Initiative" } })
db.ssc.updateMany({ "sector.name": "Agriculture" }, { $set: { "sscName": "Agriculture Skill Council of India" } })
db.ssc.updateMany({ "sector.name": "Furniture & Fittings" }, { $set: { "sscName": "Furniture and Fittings Skill Council" } })
db.ssc.updateMany({ "sector.name": "Gem & Jewellery" }, { $set: { "sscName": "Gems & Jewellery Skill Council of India" } })
db.ssc.updateMany({ "sector.name": "Green Jobs" }, { $set: { "sscName": "Skill Council for Green Jobs" } })
db.ssc.updateMany({ "sector.name": "Handicrafts" }, { $set: { "sscName": "Handicrafts and Carpet Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Handicrafts and Carpet" }, { $set: { "sscName": "Handicrafts and Carpet Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Infrastructure Equipment" }, { $set: { "sscName": "Infrastructure Equipment Skill Council" } })
db.ssc.updateMany({ "sector.name": "Iron and Steel" }, { $set: { "sscName": "Indian Iron & Steel Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Leather" }, { $set: { "sscName": "Leather Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Logistics" }, { $set: { "sscName": "Logistics Skill Council" } })
db.ssc.updateMany({ "sector.name": "Management" }, { $set: { "sscName": "Management & Entrepreneurship and Professional Skills Council" } })
db.ssc.updateMany({ "sector.name": "Media & Entertainment" }, { $set: { "sscName": "Media & Entertainment Skills Council" } })
db.ssc.updateMany({ "sector.name": "Mining" }, { $set: { "sscName": "Skill Council for Mining Sector" } })
db.ssc.updateMany({ "sector.name": "Hydrocarbon" }, { $set: { "sscName": "Hydrocarbon Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Plumbing" }, { $set: { "sscName": "Indian Plumbing Skills Council" } })
db.ssc.updateMany({ "sector.name": "Life Sciences" }, { $set: { "sscName": "Life Sciences Sector Skill Development Council" } })
db.ssc.updateMany({ "sector.name": "Power" }, { $set: { "sscName": "Power Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Rubber" }, { $set: { "sscName": "Rubber Skill Development Council" } })
db.ssc.updateMany({ "sector.name": "Retail" }, { $set: { "sscName": "Retailers Association’s Skill Council of India" } })
db.ssc.updateMany({ "sector.name": "Sports" }, { $set: { "sscName": "Sports, Physical Education, Fitness and Leisure Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Strategic Manufacturing" }, { $set: { "sscName": "STRATEGIC MANUFACTURING SECTOR SKILL COUNCIL" } })
db.ssc.updateMany({ "sector.name": "Healthcare" }, { $set: { "sscName": "Healthcare Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Telecom" }, { $set: { "sscName": "Telecom Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Textile" }, { $set: { "sscName": "Textile Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "Tourism & Hospitality" }, { $set: { "sscName": "Tourism and Hospitality Skill Council" } })
db.ssc.updateMany({ "sector.name": "IT-ITeS" }, { $set: { "sscName": "IT-ITeS Sector Skill Council" } })
db.ssc.updateMany({ "sector.name": "PwD" }, { $set: { "sscName": "Skill Council for PwD" } })
db.ssc.updateMany({ "sector.name": "Instrumentation" }, { $set: { "sscName": "Instrumentation, Automation, Surveillance & Communication Sector Skill Council" } })


// 1

db.labArea.find({}).forEach(x => {
    db.qps.find({
        "qpCode": x["qpCode"]
    }).limit(1).forEach(y => {
        db.ssc.find({
            "sector.name": y["sectors"]["sectorName"],
            "sscName": {
                $exists: true
            }
        }).limit(1).forEach(z => {
            x.sscName = z.sscName
            db.labArea.save(x)
        })
    })
})


// 2

db.trainerPreRequisite.find({}).forEach(x => {
    db.qps.find({
        "qpCode": x["qpCode"]
    }).limit(1).forEach(y => {
        db.ssc.find({
            "sector.name": y["sectors"]["sectorName"],
            "sscName": {
                $exists: true
            }
        }).limit(1).forEach(z => {
            x.sscName = z.sscName
            db.trainerPreRequisite.save(x)
        })
    })
})

// 3
db.trainerPreRequisiteMigrated.find({}).forEach(x => {
    db.qps.find({
        "qpCode": x["qpCode"]
    }).limit(1).forEach(y => {
        db.ssc.find({
            "sector.name": y["sectors"]["sectorName"],
            "sscName": {
                $exists: true
            }
        }).limit(1).forEach(z => {
            x.sscName = z.sscName
            db.trainerPreRequisiteMigrated.save(x)
        })
    })
})

// 4

db.specificationreport.find({}).forEach(x => {
    db.ssc.find({
        "sector.name": x["sector"],
        "sscName": {
            $exists: true
        }
    }).limit(1).forEach(y => {
        x.sscName = y.sscName
        db.specificationreport.save(x)
    })
})





db.tcworkflow.update({ "_id": ObjectId("5dcd24d840b4db041d31d050"), "tcId": "TC063634" },
    { "$set": { status: "Accrediated", "jobRole.status": "Accrediated" } })

db.trainingcentre.update({ userName: "TC063634", "jobRoles.qp": "TEL/Q0100" }, {
    $set: {
        "jobRoles.$.sscStatus": "Accrediated",
        "jobRoles.$.accrediatedOn": ISODate("2019-11-14T09:56:40.532Z")
    }
})

db.tcworkflow.update({ "_id": ObjectId("5d59795d8313a603c6691888"), "tcId": "TC101073" },
    { "$set": { status: "Accrediated", "jobRole.status": "Accrediated" } })

db.trainingcentre.update({ userName: "TC101073", "jobRoles.qp": "TEL/Q0100" }, {
    $set: {
        "jobRoles.$.sscStatus": "Accrediated",
        "jobRoles.$.accrediatedOn": ISODate("2019-08-18T16:14:21.653Z")
    }
})

db.trainingcentre.aggregate([
    {
        "$match":
        {
            "jobRoles.sector.sectorID": "12",
        }
    },

])

db.trainingcentre.aggregate([
    {
        "$match": { "jobRoles.sector.sectorID": "12" },
    },
    {
        "$unwind": "$jobRoles",
    },
    {
        "$match": { "jobRoles.sector.sectorID": "12" },
    },
    {
        "$project": {
            "_id": 0,
            "userName": 1,
            "jobRoleName": "$jobRoles.name",
            "qp": "$jobRoles.qp",
            "status": "$jobRoles.status",
            "qcStatus": "$jobRoles.qcStatus",

            "schemeID": "$jobRoles.scheme.schemeId",
            "schemeStatus": "$jobRoles.schemeApprover.status",
            "schemeActionTakenOn": "$jobRoles.schemeApprover.actionTakenOn",
            "sscStatus": "$jobRoles.sscStatus",
            "accrediatedOn": "$jobRoles.accrediatedOn",
            "affiliationDone": "$jobRoles.affiliationDone",
            "affiliatedOn": "$jobRoles.affiliatedOn",
        }
    },
    { "$sort": { "_id": -1 } },
    {
        "$skip": 0
    },
    {
        "$limit": 10
    },
]).pretty()


db.tcworkflow.find({ status: { "$in": ["New Request", "reRequest"] }, assignedNextUserRole: "SSC", "jobRole.sectorId": "40" }).forEach(x => {

    tcData = db.trainingcentre.findOne({ userName: x["tcId"] })
    print(tcData["userName"])
    x["assignedNextUserRole"] == "Inspection Agency"
    if (tcData["address"]["zone"] == "IMAC") {
        x["assignedNextUser"] == "PI0006"
    } else {
        x["assignedNextUser"] == "PQ0001"
    }
    db.tcworkflow.save(x)
})

db.tcworkflow.find({ status: { "$in": ["TCREJECTEDIASCHEDULE"] }, assignedNextUserRole: "SSC" }).forEach(x => {

    tcData = db.trainingcentre.findOne({ userName: x["tcId"] })
    print(tcData["userName"])
    x["assignedNextUserRole"] == "Inspection Agency"
    if (tcData["address"]["zone"] == "IMAC") {
        x["assignedNextUser"] == "PI0006"
    } else {
        x["assignedNextUser"] == "PQ0001"
    }
    db.tcworkflow.save(x)
})

db.cmworkflow.find({ status: { "$in": ["Submitted By TC"] }, assignedNextUserRole: "SSC" }).forEach(x => {

    tcData = db.trainingcentre.findOne({ userName: x["tcId"] })
    print(tcData["userName"])
    x["assignedNextUserRole"] == "Inspection Agency"
    if (tcData["address"]["zone"] == "IMAC") {
        x["assignedNextUser"] == "PI0006"
    } else {
        x["assignedNextUser"] == "PQ0001"
    }
    db.cmworkflow.save(x)
})



data = db.qps.findOne({ "qpCode": "HSS/Q5102" }, { eqptDetails: 1 })
eqptDetails = data["eqptDetails"]
for (let k = 0; k < eqptDetails.length; k++) {
    print(eqptDetails[k]["eqptName"])
}

db.trainingcentre.find({ userName: "TC143254" }).forEach(x => {

    var finalEqpData = []
    for (let i = 0; i < x["jobRoles"].length; i++) {
        for (let j = 0; j < x["jobRoles"][i]["equipemnts"].length; j++) {
            //print(x["jobRoles"][i]["equipemnts"][j]["eqptName"])
            for (let k = 0; k < eqptDetails.length; k++) {
                print(eqptDetails[k]["eqptName"])
                if (eqptDetails[k]["eqptName"] == x["jobRoles"][i]["equipemnts"][j]["eqptName"]) {
                    finalEqpData = finalEqpData.push(x["jobRoles"][i]["equipemnts"][j])
                }
            }
        }
    }
})