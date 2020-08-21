db.payments.updateMany({ userId: "TC128016", "status": "pending" }, { "$set": { "status": "failed" } })
db.payments.updateMany({ "status": "pending" }, { "$set": { "status": "failed" } })
db.payments.find({ userId: "TC300030" }, { "status": 1 })


db.trainingcentre.update({ userName: "TC047325" },
    {
        "$set": { status: "Qualified" }
    }
)


db.payments.updateMany({ "requestMetadata.subscriptionDetails.dynamicDetails.qpCode": { "$exists": true } },
    {
        $rename: {
            "requestMetadata.subscriptionDetails.dynamicDetails.qpCode": "requestMetadata.subscriptionDetails.dynamicDetails.qpcode"
        }
    })

db.payments.updateMany({ userId: "TC109681" }, { $unset: { "receiptPath": "" } })

db.payments.distinct("requestMetadata.subscriptionDetails.referenceType")

db.payments.find({ "responseMetadata.order_id": "ORD_28476" })
db.payments.find({ "responseMetadata.order_id": "ORD_28476" }, { "requestMetadata.subscriptionDetails.referenceType": 1 }).pretty()
db.payments.find({ "responseMetadata.order_id": "ORD_19155" }, { "requestMetadata.subscriptionDetails.referenceType": 1 }).pretty()

db.payments.find({ "requestMetadata.subscriptionDetails.referenceType": "Tc Appeal", migration: { "$exists": false } }, { userId: 1 })
//TC059498


db.payments.find({
    "requestMetadata.subscriptionDetails.referenceType": "Affiliation Fee",
    "requestMetadata.subscriptionDetails.dynamicDetails.qpcode": { "$exists": true },
    "requestMetadata.subscriptionDetails.dynamicDetails.sectorId": { "$exists": true },
}).forEach(x => {
    sectorID = x["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["sectorId"]
    sscName = x["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["sscName"]
    data = db.ssc.find({ "sector.id": sectorID, "type": "SMART" }).limit(1).toArray()
    if (sscName != data[0]["sscName"]) {
        print("ssc name " + sscName + " changed to " + data[0]["sscName"])
        x["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["sscName"] = data[0]["sscName"]
        db.payments.save(x)
    }
})

db.payments.find({
    "requestMetadata.subscriptionDetails.referenceType": "Affiliation Fee",
    "requestMetadata.subscriptionDetails.dynamicDetails.qpcode": { "$in": ["BWS/Q0101", "BWS/Q0102", "BWS/Q0201", "BWS/Q0202", "BWS/Q0402"] },
}).forEach(x => {

    x["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["sscName"] = "Beauty & Wellness Sector Skill Council"
    x["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["sectorId"] = 4

    db.payments.save(x)
})

db.payments.find({ userId: "TC101176", "requestMetadata.subscriptionDetails.referenceType": { "$in": ["Inspection Fee", "Re-Inspection Fee"] }, "isComplete": true })


db.payments.find({
    "responseMetadata.order_id":
        { $in: ["ORD_44945", "ORD_33849", "ORD_28512", "ORD_12809", "ORD_37308", "ORD_33631", "ORD_30900", "ORD_37340", "ORD_19870", "20190412125111833250848", "20180228143323597154002", "20180313111547237157330", "20173231728135631893", "ORD_2758", "ORD_2320"] }
}, { "refund": 1 }).pretty()
