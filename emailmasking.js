db.users.updateMany({ "phone": { $exists: true, $not: { $type: 3 } } }, { "$set": { "phone": NumberLong("9986223869") } })
db.users.updateMany({ "email": { $exists: true } }, { "$set": { "email": "testingteam@transneuron.com" } })
db.users.updateMany({ "phone.mobile": { $exists: true } }, { "$set": { "phone.mobile": NumberLong("9986223869") } })

db.ssc.updateMany({ "phone.mobile": { $exists: true } }, { "$set": { "phone.mobile": NumberLong("9986223869") } })
db.ssc.updateMany({ "email": { $exists: true } }, { "$set": { "email": "testingteam@transneuron.com" } })

db.trainingpartner.updateMany({ phone: { $exists: true, $not: { $type: 3 } } }, { "$set": { "phone": NumberLong("9986223869") } })
db.trainingpartner.updateMany({ "email": { $exists: true } }, { "$set": { "email": "testingteam@transneuron.com" } })
db.trainingpartner.updateMany({ "spoc.mobileNumber": { $exists: true } }, { $set: { "spoc.mobileNumber": NumberLong("9490285247") } })
db.trainingpartner.updateMany({ "spoc.email": { $exists: true } }, { $set: { "spoc.email": "tharun.d@transneuron.com" } })

db.trainingcentre.updateMany({ "email": { $exists: true } }, { "$set": { "email": "@transneuron.com" } })
db.trainingcentre.updateMany({ "spoc.email": { $exists: true } }, { $set: { "spoc.email": "@transneuron.com" } })
db.trainingcentre.updateMany({ "spoc.mobile": { $exists: true } }, { $set: { "spoc.mobile": NumberLong("99") } })
db.trainingcentre.updateMany({ "spoc.mobileNumber": { $exists: true } }, { $set: { "spoc.mobileNumber": NumberLong("99") } })

db.trainer.updateMany({ phone: { $exists: true, $not: { $type: 3 } } }, { "$set": { "phone": NumberLong("9986223869") } })
db.trainer.updateMany({ "email": { $exists: true } }, { "$set": { "email": "testingteam@transneuron.com" } })

// changing particular things
db.trainingcentre.updateMany({ "spoc.email": "pooja.p@transneuron.com" }, { $set: { "spoc.email": "pooja.v@trsneuron.com" } })
db.trainingcentre.updateMany({ "spoc.mobileNumber": NumberLong("9845944398") }, { $set: { "spoc.mobileNumber": NumberLong("763800") } })
db.users.updateMany({ email: "poojakshirasagar15@gmail.com" }, { "$set": { "email": "abc@gmail.com", "phone.mobile": NumberLong("12334") } })
db.users.updateMany({ "phone.mobile": NumberLong("8884496815") }, { "$set": { "email": "abc@gmail.com", "phone.mobile": NumberLong("12334") } })
db.users.updateMany({ userName: "TC15" }, { "$set": { "email": "mahesh.k@transneuron.com", "phone.mobile": NumberLong("9966138478") } })

db.trainingcentre.updateMany({ "spoc.email": "poojakshirasagar15@gmail.com" }, { $set: { "spoc.email": "pooja.v@trsneuron.com" } })
db.trainingcentre.updateMany({ "spoc.mobileNumber": NumberLong("8884496815") }, { $set: { "spoc.mobileNumber": NumberLong("763800") } })

db.trainingcentre.updateMany({ "spoc.mobileNumber": { $exists: true }, "continuousMonitoringPayment": "success" }, { $set: { "spoc.mobileNumber": NumberLong("9490285247") } })
db.trainingcentre.updateMany({ "spoc.email": { $exists: true }, "continuousMonitoringPayment": "success" }, { $set: { "spoc.email": "tharun.d@transneuron.com" } })

db.trainingcentre.updateMany({ "userName": { "$in": ["TC100256", "TC100186", "TC100452"] } },
    {
        $set: {
            "spoc.mobileNumber": NumberLong("7827286018"), "spoc.email": "govind.p@transneuron.com",
        }
    })


db.trainingpartner.updateMany({ "userName": { "$in": ["TP000137", "TP004020"] } },
    { $set: { "spoc.mobileNumber": NumberLong("9490285247"), "spoc.email": "tharun.d@transneuron.com" } })


db.trainingcentre.updateMany({ "spoc.mobileNumber": { "$exists": true } },
    { $set: { "spoc.mobileNumber": NumberLong("111111") } })

db.trainingcentre.updateMany({ "spoc.email": { "$exists": true } },
    { $set: { "spoc.email": "mah.org" } })

    db.users.updateMany({ email: "tharun.d@transneuron.com" }, { "$set": { "email": "abc@gmail.com", "phone.mobile": NumberLong("12334") } })
    db.users.updateMany({ "phone.mobile": NumberLong("9490285247") }, { "$set": { "email": "abc@gmail.com", "phone.mobile": NumberLong("12334") } })