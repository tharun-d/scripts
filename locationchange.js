db.trainingcentre.find({ status: "Qualified" }, { userName: 1, _id: 0, "jobRoles.qp":1,"jobRoles.scheme": 1 }).sort({ "_id": -1 }).pretty()

db.trainingcentre.find({userName:"TC111443" }, { locationChangeData: 1, _id: 0 }).pretty()

db.trainingcentre.update({ userName: "TC111443" }, {
    "$unset": {
        "locationChangeProcess": "",
        "locationChangeData":""
    }
})
db.locationchangeworkflow.remove({"tcId":"TC111443"})
//TP015122


// locationChangeData[].tpCreatedOn  --> tcsubmittedon or tp created on
// locationChangeData[].jobroledetails[0]. saCreatedOn  --> tp submittedon or sa created on 
// locationChangeData[].jobroledetails[0]. saSubmittedOn  --> sa submittedon 