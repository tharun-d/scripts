db.trainingcentre.find({ "userName": "TC122526" }).forEach(tcVal => {
    tcVal.jobRoles.forEach(jrVal => {
        if (jrVal.qp == "SGJ/Q0101") {
            var qpsvalue = db.qps.findOne({ qpCode: jrVal["qp"] }, { "sectors": 1 })
            var findQueryssc = {}
            findQueryssc["sector.id"] = parseInt(qpsvalue["sectors"]["sectorID"])
            var sscUname = db.ssc.findOne(findQueryssc, { userName: 1, sscName: 1 })
            var sscwflow = {
                "tcId": tcVal["userName"],
                "status": "New Request",
                "reqID": "Req1",
                "zone": tcVal["address"]["zone"],
                "state": tcVal["address"]["state"]["name"],
                "addressLine": tcVal["address"]["addressLine"],
                "district": tcVal["address"] && tcVal["address"]["district"] && tcVal["address"]["district"]["name"],
                "createdOn": new Date(),
                "actionTakenOn": new Date(),
                "assignedNextUserRole": "SSC",
                "actionTakenBy": sscUname["userName"],
                "actionTakenByRole": "SSC",
                "jobRole": {
                    "qp": jrVal.qp,
                    "name": jrVal.name,
                    "sectorId": qpsvalue["sectors"]["sectorID"],
                    "serialNumber": jrVal.serialNumber,
                    "inspection": true,
                    "qcStatus": "Under SSC Recommendation",
                    "lastActionedOn": new Date(),
                },
                "spoc": tcVal["spoc"],
                "trainingCentreName": tcVal["trainingCentreName"],
                "trainingPartnerName": tcVal["trainingPartner"]["name"],
                "sscName": sscUname["sscName"],
                "trainingPartnerID": tcVal["trainingPartner"]["userName"],
                "trainingCenterType": tcVal["trainingCenterType"],
                "createdBy": "mongoscript",
                "sscAskingReviewDetails": ""
            }
            db.tcworkflow.insert(sscwflow)
        }
    })
})

db.trainingcentre.update({ userName: "TC007462", "jobRoles.qp": "TEL/Q0100" }, {
    "$set": {
        "jobRoles.$.status": "QC Conditionally Recommended",
        "jobRoles.$.qcStatus": "QC Conditionally Recommended",
    }
})


var mc = db.smartmessagecenter.findOne({ tcid: "TC007462" })
if (mc) {

    var stage = {
        "stage": "Job role TEL/Q0100 status has been changed from not Recommended to conditionally recommended based on SR8863",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    printjson(mc['stages'][mc['stages'].length - 1])
    db.smartmessagecenter.save(mc)
}
////// done /////
db.recommendation_report.update({ tcId: x['userName'], "jobRole.qpCode": jr.qp }, {
    "$set": { "sscAccreditationStatus": "Conditionally Accrediated", "sscAccreditationDate": jr.accridiatedOn }
})
db.recommendation_report.update({ tcId: "TC100421", "jobRole.qpCode": "HSS/Q5101" },
    { "$set": { "iaRecommendationStatus": "QC Conditionally Recommended" } })

db.payments.find({
    "requestMetadata.subscriptionDetails.referenceType": "Affiliation Fee",
    "requestMetadata.subscriptionDetails.dynamicDetails": { $exists: true },
    "requestMetadata.subscriptionDetails.dynamicDetails.sectorId": { $exists: true },
    "migration": { $exists: false },
}).forEach(paymentsData => {

    db.ssc.find({
        type: "SMART",
        "address.address1": { "$exists": true },
        "sector.id": paymentsData["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["sectorId"]
    }).limit(1).forEach(sscData => {
        print(sscData["address"]["address1"])
        paymentsData["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["addressOfSSC"] = sscData["address"]["address1"]
        paymentsData["receiptPath"] = ""
    })
    db.payments.save(paymentsData)
})
db.qps.find({ "qpCode": "AMH/Q1001" }, { "sectors.sectorID": 1 }).pretty()
db.ssc.find({ "sector.id": 2, "type": "SMART" }).pretty()

db.trainingcentre.update({ userName: "TC1500482" }, {
    "$set": {
        "jobRoles.1.status": "QC Not Recommended",
        "jobRoles.1.qcStatus": "QC Not Recommended"
    }
})

var mc = db.smartmessagecenter.findOne({ tcid: "TC042707" })
if (mc) {

    var stage = {
        "stage": "job role status has been changed from not Recommended to conditionally recommended based on SR4456",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    printjson(mc['stages'][mc['stages'].length - 1])
    db.smartmessagecenter.save(mc)
}

db.trainingcentre.update({ "userName": "TC042707" }, { "$unset": { "jobRoles.$[].praposalcode": "" } })

db.trainingcentre.update({ userName: "TC007462" },
    {
        "$set":
            { "inspectionDetails.2.jobroles": ["JOBROLE_6", "JOBROLE_5"], "remainingPaymentRequired": true }
    })

db.allowduplicatepan.find({}).forEach(data => {
    db.trainingpartner.updateMany({ tpId: { "$in": data["tpId"] } }, { "$set": { "financial.pan": data["panCard"] } })
})

db.tcworkflow.update({ "_id": ObjectId("5e82e07826366704c6121720"), "tcId": "TC127491" },
    {
        "$set":
        {
            "otherInformation.centreinspection.firstProposedDate": ISODate("2021-02-24T00:00:00Z"),
            "otherInformation.centreinspection.proposeddate": ISODate("2021-02-24T00:00:00Z"),
        }
    })


db.trainingcentre.find({ userName: "TC138858" }).forEach(x => {
    //inspectionCenterDates
    len = x["inspectionCenterDates"].length
    print("previous inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])
    x["inspectionCenterDates"][len - 1]["proposeddate"] =  ISODate("2021-02-24T00:00:00Z")
    print("updated inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])

    db.trainingcentre.save(x)
})