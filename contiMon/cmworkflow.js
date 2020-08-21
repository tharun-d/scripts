db.cmworkflow.insert(
    {
        "year": 2020,
        "quarterNumber": 1,
        "tcId": "TC920028",
        "status": "Submitted By TC",
        "state": "KARNATAKA",
        "district": "BALLARI",
        "pinCode": "521121",
        "zone": "IMAC",
        "createdOn": ISODate("2020-04-29T11:30:34.682Z"),
        "actionTakenOn": ISODate("2020-04-29T11:30:34.682Z"),
        "assignedNextUser": "IA_000001",
        "assignedNextUserRole": "Inspection Agency",
        "typeOfRequest": "assesmentRequest",
        "assignedTo": "NA",
        "spocName": "Quam tenetur digniss",
        "spocNumber": NumberLong("9490285247"),
        "trainingCentreName": "shila",
        "trainingPartnerName": "shila",
        "trainingPartnerUserName": "TP200199",
        "uuid": "d34deb1d-5fdf-4283-9afd-56d027ce2ba6"
    }
)

//IA Assign to QC and CI
db.cmworkflow.insert(
    {
        "year": 2020,
        "quarterNumber": 1,
        "tcId": "TC300040",
        "status": "Assign For Inspection",
        "address": "Hyderabasd",
        "state": "ANDHRA PRADESH",
        "district": "ANANTAPUR",
        "zone": "IMAC",
        "createdOn": new Date(),
        "actionTakenOn": ISODate("2020-05-05T10:29:13.074Z"),
        "assignedNextUser": "IA_000001",
        "assignedNextUserRole": "Inspection Agency",
        "assignedTo": "NA",
        "typeOfRequest": "inspectionRequest",
        "spocName": "asdfas",
        "spocNumber": NumberLong("7892463800"),
        "trainingCentreName": "fvzdf",
        "trainingPartnerName": "TNT Technologies pvt lmt",
        "uuid": "d34deb1d-5fdf-4283-9afd-56d027ce2ba6",
    }
)

// for qc
db.cmworkflow.insert(
    {
        "year": 2020,
        "quarterNumber": 4,
        "tcId": "TC300030",
        "status": "CIDONE",
        "state": "ANDHRA PRADESH",
        "district": "ANANTAPUR",
        "zone": "IMAC",
        "createdOn": ISODate("2020-05-08T04:32:25.821Z"),
        "actionTakenOn": ISODate("2020-05-08T04:32:25.821Z"),
        "assignedNextUser": "QC_000001",
        "assignedNextUserRole": "Quality Control",
        "assignedTo": "NA",
        "typeOfRequest": "inspectionRequest",
        "spocName": "asdfas",
        "spocNumber": NumberLong(7892463800),
        "trainingCentreName": "fvzdf",
        "trainingPartnerName": "TNT Technologies pvt lmt",
        "inspectionURL": "pdf-reports/1581490466187.pdf",
        "assignedInspection": "yes",
        "inspectionProposedDate": ISODate("2020-05-05T10:29:13.074Z"),
        "qcName": "QC_000001",
        "ciName": "CI_000018",
        "uuid": "d34deb1d-5fdf-4283-9afd-56d027ce2ba6"
    }

)

db.cmworkflow.updateMany({ "tcId": "TC300048" },
    { "$set": { "status": "Submitted By TC" } })


db.cmworkflow.remove({})

db.cmworkflow.updateMany({ "tcId": "TC1500480", "quarterNumber": 1, "typeOfRequest": "inspectionRequest" },
    { "$set": { "inspectionProposedDate": ISODate("2020-06-12T00:00:00Z") } })


data = db.cmworkflow.findOne({ tcId: "TC1500455", quarterNumber: 2, "assignedNextUserRole": "Inspection Agency" })
if (data) {
    data["_id"] = new ObjectId(),
        data["status"] = "Assign For Inspection",
        data["typeOfRequest"] = "inspectionRequest",
        print("done")
    db.cmworkflow.insert(data)
}