db.tcworkflow.find({ "assignedNextUserRole": "Desktop Assessor", status: "DAASSIGNED" }).forEach(ddata => {

    idata = db.tcworkflow.findOne({ "tcId": ddata["tcId"], "assignedNextUserRole": "Inspection Agency", status: "DAASSIGNED" })
    if (!idata) {
      iaData =  db.tcworkflow.find({ "tcId": ddata["tcId"], "assignedNextUserRole": "Inspection Agency" }).sort({ "_id": -1 }).toArray()
        print(iaData[0]["status"])
        print(iaData[0]["actionTakenOn"])
    }
})