var a = "TP"
b = 300000

var newTC = []

for (let index = 0; index < 50; index++) {
    newTC.push(a + (b + index))

}


db.trainingpartner.find({ "userName": "TP200178" }, { _id: 0 }).forEach(y => {
    newTC.forEach(tc => {
        y["userName"] = tc
        db.trainingpartner.insertOne(y)
    })
})

db.users.find({ "userName": "TP200178" }, { _id: 0 }).forEach(y => {
    newTC.forEach(tc => {
        y["userName"] = tc
        db.users.insertOne(y)
    })
})

db.tpworkflow.find({ "tpId": "TP200178" }, { _id: 0 }).sort({ _id: -1 }).forEach(y => {
    newTC.forEach(tc => {
        y["tpId"] = tc
        db.tpworkflow.insertOne(y)
    })
})

db.payments.find({ userId: "TP200178" }, { _id: 0 }).sort({ _id: -1 }).forEach(y => {
    newTC.forEach(tc => {
        y["userId"] = tc
        db.payments.insertOne(y)
    })
})