
//residentialFacilities.residentialStatus

//inspectionRequest
//InspectionDateAccepted
//InspectionDateRejected

db.trainingcentre.update({ userName: "TC111139" },
    { "$set": { "residentialFacilities.residentialStatus": "inspectionRequest" } })
db.trainingcentre.find({ userName: "TC111139" },
    { "residentialFacilities": 1 }).pretty()

db.trainingcentre.find({ userName: "TC120367" },
    {
        "residentialFacilities.inspectionProcess": 1,
        "residentialFacilities.status": 1,
        "residentialFacilities.residentialStatus": 1,
        "residentialFacilities.residentialStatus": 1,
        "residentialFacilities.type.men": 1,
        "residentialFacilities.men.availability": 1,
        "residentialFacilities.menStatus.status": 1,
        "residentialFacilities.type.women": 1,
        "residentialFacilities.women.availability": 1,
        "residentialFacilities.womenStatus.status": 1,
        "residentialFacilities.type.transgender": 1,
        "residentialFacilities.transgender.availability": 1,
        "residentialFacilities.transgenderStatus.status": 1
    }).pretty()

db.residentialworkflow.update({ "_id": ObjectId("6012a5bfdd15d406079d7b8e"), "tcId": "TC111139" },
    { "$set": { "status": "inspectionRequest" } })

db.tcworkflow.update({ "_id": ObjectId("60112950dd15d43417352bd6"), "tcId": "TC116118" },
    { "$set": { "status": "CIDONE" } })
//TC112480

db.trainingcentre.update({ userName: "TC112480" },
    { "$unset": { "residentialFacilities.daReviews": "" } })