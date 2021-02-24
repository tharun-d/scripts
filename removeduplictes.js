db.trainerPreRequisiteMigrated.remove({ qpCode: "AGR/Q0801" })
db.trainerPreRequisiteMigrated.remove({ qpCode: "AGR/Q4101" })

//1
db.trainerPreRequisite.remove({ qpCode: "AGR/Q8104", "_id": ObjectId("5f7c5def1a2da2033feb7893") })
db.trainerPreRequisite.remove({ qpCode: "AGR/Q8104", "_id": ObjectId("5f7c5def1a2da2033feb7898") })
//2
db.trainerPreRequisite.remove({ qpCode: "AGR/Q7505", "_id": ObjectId("5f7d81541a2da2033feb7a1c") })
//3
db.trainerPreRequisite.remove({ qpCode: "CON/Q0313", "_id": ObjectId("5f7d84501a2da2033feb7a44") })
//4
db.trainerPreRequisite.remove({ qpCode: "CON/Q0703", "_id": ObjectId("600e946765ea5802d32615b1") })
//5
db.trainerPreRequisite.remove({ qpCode: "CON/Q0314", "_id": ObjectId("600fe4af38221702dcf4fffc") })
//6
db.trainerPreRequisite.remove({ qpCode: "RAS/Q0107", "_id": ObjectId("6013aa71873c6302e7de77a4") })


db.trainerPreRequisite.find({ status: "Active" }).forEach(data => {
    db.trainerPreRequisiteMigrated.remove({ "qpCode": data["qpCode"] })
})