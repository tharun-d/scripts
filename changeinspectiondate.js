db.trainingcentre.find({ userName: "TC121420" }).forEach(x => {
    //inspectionCenterDates
    len = x["inspectionCenterDates"].length
    print("previous inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])
    x["inspectionCenterDates"][len - 1]["proposeddate"] = ISODate("2020-07-30T00:00:00Z")
    print("updated inspectionCenterDates: ", x["inspectionCenterDates"][len - 1]["proposeddate"])

    //inspectionDetails
    len = x["inspectionDetails"].length
    print("previous inspectionDetails: ", x["inspectionDetails"][len - 1]["inspectiondate"])
    x["inspectionDetails"][len - 1]["inspectiondate"] = ISODate("2020-07-30T00:00:00Z")
    print("updated inspectionDetails: ", x["inspectionDetails"][len - 1]["inspectiondate"])
    db.trainingcentre.save(x)
})

var mc = db.smartmessagecenter.findOne({ tcid: "TC121420" })
if (mc) {

    var stage = {
        "stage": "Based on SR-5005 we have changed inspection date from 31th july 2020 to 30th july 2020",
        "stageDate": new Date()
    }
    mc['stages'].push(stage)
    printjson(mc['stages'][mc['stages'].length - 1])
    db.smartmessagecenter.save(mc)
}

db.tcworkflow.updateMany({
    "tcId": "TC121420",
    "otherInformation.centreinspection.proposeddate": { $exists: true },
    "assignedNextUserRole": {
        $in: ["Quality Control", "Inspection Agency", "Centre Inspector"]
    }
}, {
    $set: {
        "otherInformation.centreinspection.proposeddate": ISODate("2020-07-30T00:00:00Z")
    }
})

//TC106298,TC115368,TC125533,TC115169,TC103934 firstpropsed date wrong

var tcw = [
    { "tcId": "TC106298", "createdOn": ISODate("2019-09-04T09:26:21.364Z"), "proposeddate": ISODate("2019-09-11T00:00:00Z") },
    { "tcId": "TC106298", "createdOn": ISODate("2019-10-09T08:29:35.819Z"), "proposeddate": ISODate("2019-10-20T00:00:00Z") },

    { "tcId": "TC055518", "createdOn": ISODate("2020-01-17T09:23:56.435Z"), "proposeddate": ISODate("2020-01-23T00:00:00Z") },

    { "tcId": "TC104251", "createdOn": ISODate("2020-01-20T11:58:10.837Z"), "proposeddate": ISODate("2020-01-29T00:00:00Z") },
    { "tcId": "TC104251", "createdOn": ISODate("2020-02-17T12:53:09.310Z"), "proposeddate": ISODate("2020-02-20T00:00:00Z") },

    { "tcId": "TC058949", "createdOn": ISODate("2020-01-14T05:57:07.831Z"), "proposeddate": ISODate("2020-01-23T00:00:00Z") },

    { "tcId": "TC013312", "createdOn": ISODate("2019-12-05T10:34:50.141Z"), "proposeddate": ISODate("2019-12-14T00:00:00Z") },

    { "tcId": "TC116499", "createdOn": ISODate("2020-01-29T10:47:36.305Z"), "proposeddate": ISODate("2020-02-10T00:00:00Z") },

    { "tcId": "TC107998", "createdOn": ISODate("2019-11-02T04:15:19.997Z"), "proposeddate": ISODate("2019-11-06T00:00:00Z") },

    { "tcId": "TC105971", "createdOn": ISODate("2020-01-14T06:28:29.907Z"), "proposeddate": ISODate("2020-01-25T00:00:00Z") },

    { "tcId": "TC103934", "createdOn": ISODate("2019-10-16T09:02:15.161Z"), "proposeddate": ISODate("2019-11-07T00:00:00Z") },

    { "tcId": "TC057537", "createdOn": ISODate("2020-01-27T09:07:50.079Z"), "proposeddate": ISODate("2020-02-08T00:00:00Z") },


    { "tcId": "TC057541", "createdOn": ISODate("2020-01-28T12:00:49.252Z"), "proposeddate": ISODate("2020-02-10T00:00:00Z") },

    { "tcId": "TC059347", "createdOn": ISODate("2020-01-27T09:23:28.905Z"), "proposeddate": ISODate("2020-02-10T00:00:00Z") },

    { "tcId": "TC100421", "createdOn": ISODate("2020-01-23T05:18:44.130Z"), "proposeddate": ISODate("2020-01-28T00:00:00Z") },

]

tcw.forEach(data => {

    db.tcworkflow.update({ "tcId": data["tcId"], "createdOn": data["createdOn"], "assignedNextUserRole": "Inspection Agency" },
        { "$set": { "otherInformation.centreinspection.proposeddate": data["proposeddate"] } })
})

//TC057128

tcIds = [
    "TC106298", "TC115368", "TC125533", "TC115169", "TC103934"

]

tcIds.forEach(data => {

    db.tcworkflow.updateMany({
        "tcId": data,
        "assignedNextUserRole": "Inspection Agency",
        "otherInformation.centreinspection.firstProposedDate": { "$exists": true },
    },
        { "$set": { "otherInformation.centreinspection.firstProposedDate": "" } })
})

db.tcworkflow.update({ "_id": ObjectId("5dc3d4ac1a1dae0436e48d4e"), "tcId": "TC102036", status: "TCREJECTEDIASCHEDULE" },
    {
        "$set":
        {
            "otherInformation.centreinspection.firstProposedDate": ISODate("2019-11-13T00:00:00Z"),
            "otherInformation.centreinspection.isDateRejected": true,
            "otherInformation.centreinspection.rejectedDate": ISODate("2019-11-07T08:24:12.813Z")
        }
    })