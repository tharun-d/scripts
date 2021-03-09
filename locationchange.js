db.trainingcentre.find({ status: "Qualified" }, { userName: 1, _id: 0, "jobRoles.qp": 1 }).sort({ "_id": -1 }).pretty()
db.trainingcentre.update({ userName: "TC111837" }, {
    "$set": {
        "locationChangeProcess": ""
    }
})