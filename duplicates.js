var a = "TC"
b = 10822100

var newTC = []

for (let index = 0; index < 20; index++) {
    newTC.push(a + (b + index))

}
print(newTC)
db.trainingcentre.find({ "userName": "TC10822100" }, { _id: 0 }).forEach(y => {
    newTC.forEach(tc => {
        y["userName"] = tc
        db.trainingcentre.insertOne(y)
    })
})

db.users.find({ "userName": "TC10822100" }, { _id: 0 }).forEach(y => {
    newTC.forEach(tc => {
        y["userName"] = tc
        db.users.insertOne(y)
    })
})

db.locationchangeworkflow.find({ "tcId": "TC10822100" }, { _id: 0 }).sort({ _id: -1 }).forEach(y => {
    newTC.forEach(tc => {
        y["tcId"] = tc
        db.locationchangeworkflow.insertOne(y)
    })
})

db.tcworkflow.find({ "tcId": "TC10822100" }, { _id: 0 }).sort({ _id: -1 }).forEach(y => {
    newTC.forEach(tc => {
        y["tcId"] = tc
        db.tcworkflow.insertOne(y)
    })
})
db.smartmessagecenter.find({ "tcid": "TC10822100" }, { _id: 0 }).forEach(y => {
    newTC.forEach(tc => {
        y["tcid"] = tc
        db.smartmessagecenter.insertOne(y)
    })
})

db.payments.find({ userId: "TC10822100" }, { _id: 0 }).sort({ _id: -1 }).forEach(y => {
    newTC.forEach(tc => {
        y["userId"] = tc
        db.payments.insertOne(y)
    })
})
print(newTC)
///
// remove duplicates
var a = "TC"
b = 770031

var newTC = []

for (let index = 0; index < 30; index++) {
    newTC.push(a + (b + index))

}

db.trainingcentre.remove({ "userName": { "$in": newTC } })
db.users.remove({ "userName": { "$in": newTC } })
db.tcworkflow.remove({ "tcId": { "$in": newTC } })
db.smartmessagecenter.remove({ "tcid": { "$in": newTC } })
db.payments.remove({ "userId": { "$in": newTC } })

///////////////////

var a = "TD-"
b = 77000

var newTrainer = []

for (let index = 0; index < 30; index++) {
    newTrainer.push(a + (b + index))

}
db.trainer.remove({ "userName": { "$in": newTrainer } })
db.trainer.find({ "userName": "T-013E20" }, { _id: 0 }).forEach(y => {
    newTrainer.forEach(trainer => {
        y["userName"] = trainer
        db.trainer.insertOne(y)
        print(trainer)
    })
})
////