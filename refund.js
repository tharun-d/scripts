var count = 0
db.getCollection('refund').find({}).forEach(x => {
    print(count++)
    db.payments.update({ "responseMetadata.tracking_id": x['newmer'] },
        {
            $set: {
                "eligibleForRDG": true,
                "responseMetadata.responseMetadata.currency": "INR",
            }
        })
})

db.refundPayments.find({ "processType": "Application WithDrawl", "withdrawlReferenceType": { "$exists": true } }).forEach(x => {
    var paymentsData = db.payments.findOne({ "_id": ObjectId(x["paymentId"]) })
    x["referenceType"] = paymentsData["requestMetadata"]["subscriptionDetails"]["referenceType"]
    print(x["referenceType"])
    db.refundPayments.save(x)
})

db.refundPayments.find({ "processType": "Application WithDrawl" }).forEach(x => {
    db.trainingcentre.update({ userName: x["userName"] }, { "$set": { "oldTCStatus": x["statusOfTC"] } })
    print(x["userName"], x["statusOfTC"])
    db.trainingcentre.find({ userName: x["userName"] }, { oldTCStatus: 1, _id: 0, status: 1 }).pretty()

})



db.refundPayments.find({ "orderId": "ORD_28476" }, { "referenceType": 1 }).pretty()
db.refundPayments.find({ "orderId": "ORD_19155" }, { "referenceType": 1 }).pretty()

db.refundPayments.find({ "processType": "Application WithDrawl" }).forEach(x => {
    db.trainingcentre.update({ userName: x["userName"] }, { "$set": { "financeSpocStatusForApplicationWithdrawl": x["status"] } })
    print(x["userName"], x["status"])
})

db.payments.find({ "refund.status": "Refunded", "userId": /TC/ }).forEach(x => {
    db.refundPayments.remove({ "orderId": x["responseMetadata"]["order_id"] })
    x["paymentRefundStatus"] = "Approve"
    db.payments.save(x)
})

db.refundPayments.updateMany({ referenceType: "Appeal" }, { "$set": { "processType": "Appeal Refund", "referenceType": "Appeal Process Fee" } })

db.refundPayments.find({ "userName": "TC1900", "processType": "Application WithDrawl" }, { "createdOn": 1 }).pretty()

db.refundPayments.find({ "processType": "Application WithDrawl", status: "Approve" }, { userName: 1 }).forEach(data => {
    db.trainingcentre.find({ userName: data["userName"] }).forEach(tcData => {
        tcData["status"] = "applicationWithDrawl"
        db.trainingcentre.save(tcData)
    })
})