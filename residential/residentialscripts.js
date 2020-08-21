db.trainingcentre.updateMany({}, {
    "$set": {

        "residentialFacilities.status": "",
        "residentialFacilities.timesRejectedIADate": 0,
        "residentialFacilities.residentialStatus": "",
        "residentialFacilities.numberOfPostUpdate": 4,
    }
})
//numberOfPostUpdate is updated after IA or da taking action with status Rejected
//while payment is done for unblocking then we will make it zero

db.trainingcentre.find({ "userName": "TC109798" },
    {
        "residentialFacilities.numberOfTimeFormSubmitted": 1,
        "residentialFacilities.numberOfPostUpdate": 1,
        "residentialFacilities.status": 1,
        "residentialFacilities.residentialStatus": 1,
        "residentialFacilities.men.submittedOn": 1,
    }).pretty()

db.residentialworkflow.updateMany({
    "tcId": "TC126134",
    "otherInformation.centreinspection.proposeddate": { $exists: true },
    "assignedNextUserRole": {
        $in: ["Quality Control", "Inspection Agency", "Centre Inspector"]
    }
}, {
    $set: {
        "otherInformation.centreinspection.proposeddate": ISODate("2020-07-09T00:00:00Z")
    }
})

db.trainingcentre.updateMany({ userName: "TC126134" }, {
    "$set": {
        "numberOfTimeFormSubmitted": 1,
        "numberOfPostUpdate": 0,
    }
})

db.trainingcentre.find({ userName: "TC126134" },
    {
        "numberOfTimeFormSubmitted": 1,
        "numberOfPostUpdate": 1,
    }
)

db.trainingcentre.update({ userName: "TC109798" }, {
    "$set": {

        "residentialFacilities.status": "",
    }
})