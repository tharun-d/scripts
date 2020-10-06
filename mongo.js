db.trainingcentre.find({ "userName": "TC107527" }).forEach(function (s) {
    s.jobRoles.forEach(function (k) {
        if (k.qp == "CSC/Q0204") {
            k.accrediatedOn = ISODate("2019-12-17T00:00:00.000Z")
            k.status = "Conditionally Accrediated"
            k.sscStatus = "Conditionally Accrediated"

        }
    })
    db.trainingcentre.save(s)
})
db.tcworkflow.update({
    "tcId": "TC107527",
    "status": "Not Accrediated",
    "jobRole.qp": "CSC/Q0204"
}, { "$set": { "status": "Conditionally Accrediated" } })
////////


db.trainingcentre.find({
    "migration": { "$exists": true }, centreArea: { "$exists": true, "$not": { "$size": 0 } },
    "centreArea.type": {
        $all: ["Reception", "Placement & Entrepreneurship Cell",
            "Female Washroom",
            "Male Washroom"]
    }
}).forEach(x => {
    centreAreaOrder = []
    centreAreaOthers = []
    for (var i = 0; i < x['centreArea'].length; i++) {
        if (x['centreArea'][i]['type'] == 'Male Washroom') {
            maleWashRoom = x['centreArea'][i]
        } else if (x['centreArea'][i]['type'] == 'Female Washroom') {
            femaleWashRoom = x['centreArea'][i]
        } else if (x['centreArea'][i]['type'] == 'Placement & Entrepreneurship Cell') {
            placement = x['centreArea'][i]
        } else if (x['centreArea'][i]['type'] == 'Reception') {
            reception = x['centreArea'][i]
        } else {
            centreAreaOthers.push(x['centreArea'][i])
        }
    }
    centreAreaOrder.push(reception, placement, femaleWashRoom, maleWashRoom)
    for (var i = 0; i < centreAreaOthers.length; i++) {
        centreAreaOrder.push(centreAreaOthers[i])
    }
    db.trainingcentre.update({ "userName": x["userName"] },
        {
            "$set": { "centreArea": centreAreaOrder }
        }
    )
})
///////////////


db.trainingcentre.find({ userName: { "$in": ["TC013501"] } }).forEach(x => {
    var accDate = null
    var jn = null
    for (var i = 0; i < x['jobRoles'].length; i++) {
        if (x['jobRoles'][i]['sscStatus'] == 'Not Accrediated') {
            x['jobRoles'][i]['sscStatus'] = 'Conditionally Accrediated'
            x['jobRoles'][i]['status'] = 'Conditionally Accrediated'
            jn = x['jobRoles'][i]['qp']
            print(jn)
            accDate = x['jobRoles'][i]['accrediatedOn']
            db.tcworkflow.update({
                "tcId": x['userName'],
                "status": "Not Accrediated",
                'jobRole.qp': x['jobRoles'][i]['qp']
            }, { "$set": { "status": 'Conditionally Accrediated' } })
            db.trainingcentre.save(x)
        }
    }
    var mc = db.smartmessagecenter.findOne({ tcid: x['userName'] })
    if (mc) {
        //mc['stages'].pop()
        // Update a message to application stages so can be find that This TC is marked DNR to specific reason
        var stage = {
            "stage": "SSC has marked the Job Role as Conditionally Accredited. Please pay Continuous Monitoring Fees and Affiliation Fees.",
            "stageDate": accDate ? accDate : new Date()
        }
        mc['stages'].push(stage)
        printjson(mc['stages'][mc['stages'].length - 1])
        db.smartmessagecenter.save(mc)
    }
})

db.trainingcentre.aggregate([
    { "$unwind": "$jobRoles" },
    {
        "$match": {
            "jobRoles.sscStatus": { "$in": ["Conditionally Accrediated", "Accrediated", "Not Accrediated"] },
            "jobRoles.accrediatedOn": null
        }
    },
    {
        "$project": {
            "_id": 0,
            "TCID": "$userName",
            "JOBROLE": "$jobRoles.name",
            "QPCODE": "$jobRoles.qp",
            "SSCSTATUS": "$jobRoles.sscStatus",
            "ACCREDIATEDON": "$jobRoles.accrediatedOn"
        }
    },
    { "$out": "accDateIssueDec18" }
])

db.trainingcentre.find({
    "trainingCenterType": "Government",
    "trainingPartner.type": "Government Institute",
    status: "Blocked"
}).forEach(x => {

    print(x["userName"])
    db.tcworkflow.remove({ tcId: x["userName"], "actionTakenByRole": "Inspection Agency" })
    db.tcworkflow.remove({ tcId: x["userName"], "actionTakenByRole": "Desktop Assessor" })
    db.tcworkflow.remove({ tcId: x["userName"], "actionTakenByRole": "Quality Control" })
    db.trainingcentre.update({ userName: x["userName"] }, { $set: { status: "Rejected" }, $unset: { daReviews: "" } })
})

db.trainingcentre.find({
    jobRoles: { "$exists": true, "$not": { "$size": 0 } },
    "processType": "Accreditation & Affiliation",
}).forEach(x => {
    if (Array.isArray(x["jobRoles"])) {
        x["jobRoles"].forEach(y => {
            if (y["affiliationDone"]) {
                db.payments.find({
                    "requestMetadata.subscriptionDetails.referenceType": "Affiliation Fee",
                    "requestMetadata.subscriptionDetails.dynamicDetails.qpcode": y["qp"],
                    "userId": x["userName"],
                    "status": "success"
                }).sort({ _id: -1 }).limit(1).forEach(paymentDetails => {
                    print(paymentDetails["date"])
                    db.trainingcentre.update({ userName: x["userName"], "jobRoles.qp": y["qp"] },
                        { $set: { "jobRoles.$.affiliatedOn": paymentDetails["date"] } }
                    )
                })
            }
        })
    }
})


db.trainingcentre.updateOne({ userName: "TC110012" }, { $set: { status: "Qualified" } })

db.tcworkflow.updateOne({
    "tcId": "TC050349",
    "status": "blockedDueToInspectionReject",
    "assignedNextUserRole": "Inspection Agency"
}, { $set: { status: "TCREJECTEDIASCHEDULE" } })


db.tcworkflow.updateOne({
    "tcId": "TC110111",
    "status": "blockedDueToInspectionReject",
    "assignedNextUserRole": "Inspection Agency"
}, { $set: { status: "TCREJECTEDIASCHEDULE" } })


db.tcworkflow.updateMany({
    "tcId": "TC1500281",
    "otherInformation.centreinspection.proposeddate": { $exists: true },
    "assignedNextUserRole": {
        $in: ["Quality Control", "Inspection Agency", "Centre Inspector"]
    }
}, {
    $set: {
        "otherInformation.centreinspection.proposeddate": ISODate("2020-07-13T00:00:00Z")
    }
})

db.trainingcentre.find({ userName: "TC037484" }).forEach(x => {
    //inspectionCenterDates
    len = x["inspectionCenterDates"].length
    print("previous inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])
    x["inspectionCenterDates"][len - 1]["proposeddate"] = ISODate("2020-01-07T00:00:00Z")
    print("updated inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])

    //inspectionDetails
    len = x["inspectionDetails"].length
    print("previous inspectionDetails: ", x["inspectionDetails"][len - 1]["inspectiondate"])
    x["inspectionDetails"][len - 1]["inspectiondate"] = ISODate("2020-01-07T00:00:00Z")
    print("updated inspectionDetails: ", x["inspectionDetails"][len - 1]["inspectiondate"])
    db.trainingcentre.save(x)
})

db.trainingcentre.update({ "userName": "TC107863" },
    {
        $set: {
            "jobRoles.1.status": "QC Conditionally Recommended",
            "jobRoles.1.qcStatus": "QC Conditionally Recommended",
            "jobRoles.1.maxCapacity": 60,
            "jobRoles.1.listOfComments.0.comment": "SSC TOT & NIESBUD certification not provided for trainer",
        }
    })

db.tcworkflow.updateMany({ "tcId": "TC100179", "status": { $in: ["TCAGGREEDIASCHEDULE", "CIAccepted"] } },
    {
        $set: {
            "status": "CIDONE"
        }
    }
)

db.tcworkflow.find({ tcId: "TC110012" }).sort({ _id: -1 }).pretty()

db.tcworkflow.remove({ _id: ObjectId("5e1046731a9a8d832c73a2c9"), "status": "New Request", tcId: "TC111516" })
db.tcworkflow.remove({ _id: ObjectId("5e1046731a9a8d832c73a2d1"), "status": "New Request", tcId: "TC111516" })

db.trainingcentre.update({ userName: "TC058004" }, { $set: { "residentialFacilities.men.capacity": 30 } })

db.trainingcentre.update({ userName: "TC059758" },
    {
        $set: { "inspectionDetails.0.jobRoles": ["JOBROLE_2", "JOBROLE_3"], "jobRoles.$[].status": "InspectionDateAccepted" },

    })

db.trainingcentre.find({ "userName": "TC051535" }).forEach(x => {
    var ir = {
        "jobroles": [
            "JOBROLE_1"
        ],
        "classroom": [
            "L5CR-1",
        ],
        "laboratory": [
            "LAB_1",
        ],
        "inspectiondate": ISODate("2020-03-09T00:00:00Z"),
    }
    x['inspectionDetails'].push(ir)
    printjson(x['inspectionDetails'])
    db.trainingcentre.save(x)
})

db.trainingcentre.update({ userName: "TC032846" },
    {
        $set:
        {
            "jobRoles.1.classroom": ["Classroom 2"], "jobRoles.1.laboratory": ["Lab 2"]
        }
    })

db.trainingcentre.update({ userName: "TC032560" },
    {
        $set:
        {
            "jobRoles.1.classroom": ["Classroom 1"], "jobRoles.1.laboratory": ["Lab 1"]
        }
    })


db.trainingcentre.update({ userName: "TC051919" },
    { $set: { "jobRoles.1.status": "Under SSC Recommendation" } })


////
db.trainingcentre.update({ userName: "TC032846" },
    {
        $set:
        {
            "jobRoles.2.classroom": ["Classroom 2"], 
            "jobRoles.2.laboratory": ["Lab 2"],
            "jobRoles.2.hybrid": ["Lab 2"]
        }
    })

db.trainingcentre.update({ userName: "TC018839" },
    {
        $set:
        {
            "jobRoles.0.classroom": ["1"], "jobRoles.0.laboratory": ["3"]
        }
    })


db.trainingcentre.update({ userName: "TC018839" },
    {
        $set:
        {
            "jobRoles.1.classroom": ["2"], "jobRoles.1.laboratory": ["Lab 6"]
        }
    })



db.recommendation_report.update({ tcId: "TC110181", "jobRole.qpCode": "AMH/Q0301" }, {
    "$set": { "sscAccreditationStatus": "Conditionally Accrediated", "sscAccreditationDate": ISODate("2019-12-05T18:59:57.068Z") }
})


db.trainingcentre.update({ "userName": "TC110181", "processType": "Accreditation & Affiliation" },
    {
        $set: {
            "jobRoles.0.status": "Conditionally Accrediated",
            "jobRoles.0.sscStatus": "Conditionally Accrediated",
            "jobRoles.0.accrediatedOn": ISODate("2019-12-05T18:59:57.068Z"),
        }
    }
)

db.trainingcentre.find({
    jobRoles: { "$exists": true, "$not": { "$size": 0 } },
    "processType": "Accreditation & Affiliation",
    "trainingCenterType": { "$nin": ["Government"] }
}).forEach(x => {
    if (Array.isArray(x["jobRoles"])) {
        x["jobRoles"].forEach(y => {
            if (y["affiliationDone"]) {
                count = db.payments.find({
                    "requestMetadata.subscriptionDetails.referenceType": "Affiliation Fee",
                    "requestMetadata.subscriptionDetails.dynamicDetails.qpcode": y["qp"],
                    "userId": x["userName"],
                    //"status": "success",
                    "isComplete": true
                }).sort({ _id: -1 }).limit(1).count()
                if (count != 1) {
                    print(x["userName"])
                }
            }
        })
    }
})


db.trainingcentre.find({
    jobRoles: { "$exists": true, "$not": { "$size": 0 } },
    "processType": "Accreditation & Affiliation",
}).forEach(x => {
    if (Array.isArray(x["jobRoles"])) {
        if (x["trainingCenterType"] == "Government") {
            x["jobRoles"].forEach(y => {
                if (y["accrediatedOn"] != null && y["accrediatedOn"] != "") {
                    print(y["accrediatedOn"])
                    db.trainingcentre.update({ userName: x["userName"], "jobRoles.qp": y["qp"] },
                        { $set: { "jobRoles.$.affiliatedOn": y["accrediatedOn"] } })
                }
            })
        } else {
            x["jobRoles"].forEach(y => {
                if (y["affiliationDone"]) {
                    db.payments.find({
                        "requestMetadata.subscriptionDetails.referenceType": "Affiliation Fee",
                        "requestMetadata.subscriptionDetails.dynamicDetails.qpcode": y["qp"],
                        "userId": x["userName"],
                        "status": "success"
                    }).sort({ _id: -1 }).limit(1).forEach(paymentDetails => {
                        print(paymentDetails["date"])
                        db.trainingcentre.update({ userName: x["userName"], "jobRoles.qp": y["qp"] },
                            { $set: { "jobRoles.$.affiliatedOn": paymentDetails["date"] } })
                    })
                }
            })
        }
    }
})


db.trainingcentre.find({
    jobRoles: { "$exists": true, "$not": { "$size": 0 } },
    "processType": "Accreditation & Affiliation",
}).forEach(x => {
    if (Array.isArray(x["jobRoles"])) {
        x["jobRoles"].forEach(y => {
            db.tcworkflow.find({
                "jobRole.qpcode": y["qp"],
                "tcId": x["userName"],
                "status": "Scheme Approved"
            }).sort({ _id: -1 }).limit(1).forEach(workflowDetails => {
                print(workflowDetails["createdOn"])
                // db.trainingcentre.update({ userName: x["userName"], "jobRoles.qp": y["qp"] },
                //     { $set: { "jobRoles.$.schemeApprover.actionTakenOn": workflowDetails["createdOn"] } }
                // )
            })

        })
    }
})


db.trainingcentre.find({
    jobRoles: { "$exists": true, "$not": { "$size": 0 } },
    "processType": "Accreditation & Affiliation",
}).forEach(x => {
    if (Array.isArray(x["jobRoles"])) {
        x["jobRoles"].forEach(y => {
            if (y["schemeApprover"] != null && y["schemeApprover"]["status"] != null) {
                if (y["schemeApprover"]["status"] == "Approved") {
                    db.trainingcentre.update({ userName: x["userName"], "jobRoles.qp": y["qp"] },
                        { $set: { "jobRoles.$.schemeApprover.status": "approved" } })
                }
            }
        })
    }
})

db.trainingcentre.update({ "userName": "TC101306" },
    {
        "$unset":
            { "jobRoles.1.remainingTarget": "" }
    })

db.tcworkflow.update({ tcId: "TC041452", "jobRole.qp": "ASC/Q1411", "assignedNextUserRole": "Scheme Approver" }
    , { $set: { "status": "Scheme Rejected" } })

db.trainingcentre.update({ 'userName': 'TC041452' }, {
    $set: {
        "jobRoles.0.schemeApprover.status": "reject",
        "jobRoles.0.status": "Scheme Rejected"
    }
})
var mc = db.smartmessagecenter.findOne({ tcid: "TC041452" })
if (mc) {
    var stage = {
        "stage": "For job role ASC/Q1411 status is changed to scheme rejected SR is SR-2743",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    printjson(mc['stages'][mc['stages'].length - 1])
    db.smartmessagecenter.save(mc)
}

db.ssc.find({ "type": "SMART" }).forEach(data => {
    if (typeof data["sector"]["id"] === 'string') {
        data["sector"]["id"] = parseInt(data["sector"]["id"])
        db.ssc.save(data)
    }
})

db.payments.find({ "isComplete": true, "amount": { "$exists": false }, "migration": { "$exists": true } }).forEach(data => {
    data["amount"] = data["responseMetadata"]["amount"]
    db.payments.save(data)
})

db.refundPayments.find({}).forEach(refundPaymentsData => {
    db.payments.find({ "responseMetadata.order_id": refundPaymentsData["orderId"] }).forEach(paymentsData => {
        refundPaymentsData["paidAmount"] = paymentsData["amount"]
    })
    db.refundPayments.save(refundPaymentsData)
})
db.trainingcentre.find({ "userName": "TC000053" }, { "jobRoles": 1 }).forEach(tc => {
    tc.jobRoles.forEach(jr => {
        if (jr.qp == "TEL/Q0100") {
            jr.status = "Conditionally Accrediated"
            jr.sscStatus = "Conditionally Accrediated"
            jr.accrediatedOn = ISODate("2020-02-28T18:30:00Z")
        }
    })
    db.trainingcentre.save(tc)
})

db.tcworkflow.update({ "tcId": "TC000053", "jobRole.qp": "TEL/Q0100", "assignedNextUserRole": "SSC" },
    {
        $set: {
            "actionTakenOn": ISODate("2020-02-28T18:30:00Z")
        }
    })

db.trainingcentre.update({
    "trainingCenterType": "Government",
    "trainingPartner.type": "Government Institute",
    "processType": "Accreditation & Affiliation",
}, {
    "$unset": { "continuousMonitoringPayment": "" }
})



db.refundPayments.find({}).forEach(x => {
    if (x["referenceType"] == "Affiliation Fee") {

        var paymentsData = db.payments.findOne({ "responseMetadata.order_id": x["orderId"] })

        if (paymentsData["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["qpCode"]) {

            print(paymentsData["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["qpCode"])
            x["qpCode"] = paymentsData["requestMetadata"]["subscriptionDetails"]["dynamicDetails"]["qpCode"]

            db.refundPayments.save(x)
        }

    }
})

db.tcworkflow.update({ "_id": ObjectId("5e4bc8a62ab3ad0451cfde43"), tcId: "TC110111" },
    {
        "$set": { status: "reRequest" }
    })

db.tcworkflow.update({ tcId: "TC1500480", "assignedNextUserRole": "Quality Control" },
    { $set: { "status": "CIDONE" } })


db.tcworkflow.updateMany({
    "tcId": "TC110864",
    "status": "TCAGGREEDIASCHEDULE",
},
    { "$set": { "otherInformation.centreinspection.proposeddate": ISODate("2020-06-11T00:00:00Z") } }
)

var mc = db.smartmessagecenter.findOne({ tcid: "TC110864" })
if (mc) {

    var stage = {
        "stage": "Based on SR-4491 we have assigned inspection date to 11th june 2020",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    printjson(mc['stages'][mc['stages'].length - 1])
    db.smartmessagecenter.save(mc)
}

db.trainingcentre.find({ userName: "TC110864" }).forEach(x => {
    //inspectionCenterDates
    len = x["inspectionCenterDates"].length
    print("previous inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])
    x["inspectionCenterDates"][len - 1]["proposeddate"] = ISODate("2020-06-11T00:00:00Z")
    print("updated inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])

    //inspectionDetails
    len = x["inspectionDetails"].length
    print("previous inspectionDetails: ", x["inspectionDetails"][len - 1]["inspectiondate"])
    x["inspectionDetails"][len - 1]["inspectiondate"] = ISODate("2020-06-11T00:00:00Z")
    print("updated inspectionDetails: ", x["inspectionDetails"][len - 1]["inspectiondate"])
    db.trainingcentre.save(x)
})
