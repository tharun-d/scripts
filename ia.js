tcVal = db.trainingcentre.findOne({ userName: "TC061896" })
var IAworkflow = {
    "_id": new ObjectId(),
    "tcId": "TC061896",
    "status": "inspectionRequest",
    "reqID": "Req1",
    "zone": tcVal["address"]["zone"],
    "state": tcVal["address"]["state"]["name"],
    "addressLine": tcVal["address"]["addressLine"],
    "district": tcVal["address"] && tcVal["address"]["district"] && tcVal["address"]["district"]["name"],
    "createdOn": ISODate("2020-01-22T12:23:34.939Z"),
    "actionTakenOn": ISODate("2020-01-22T12:23:34.939Z"),
    "assignedNextUser": "PQ0001",
    "assignedNextUserRole": "Inspection Agency",
    "spoc": tcVal["spoc"],
    "trainingCentreName": tcVal["trainingCentreName"],
    "trainingPartnerName": tcVal["trainingPartner"]["name"],
    "trainingPartnerID": tcVal["trainingPartner"]["userName"],
    "trainingCenterType": tcVal["trainingCenterType"],
    "createdBy": "mongoscript",
}
db.tcworkflow.insert(IAworkflow)

db.trainingcentre.update({ userName: "TC061896" }, {
    "$set":
        { "jobRoles.$[].status": "inspectionRequest", "inspectionProcess": "start", "tcstatus": "inspectionRequest" }
})
var mc = db.smartmessagecenter.findOne({ tcid: "TC061896" })
if (mc) {

    var stage = {
        "stage": "Inspection Planning Under Progress",
        "stageDate": ISODate("2020-01-22T12:23:34.939Z")
    }
    mc['stages'].push(stage)
    printjson(mc['stages'][mc['stages'].length - 1])
    db.smartmessagecenter.save(mc)
}

db.payments.update({ "_id": ObjectId("5e283ec69b1abe001b1d129f"), "userId": "TC061896" }, { "$set": { "status": "success" } })