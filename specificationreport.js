db.specificationreport.updateMany({ "labAreaSpecifiactionDisclaimerUpdatedOn": { "$exists": true } },
    { "$set": { "labAreaSpecifiactionDisclaimer": "yes" } })

db.qps.find({ qpCode: "AGR/Q0102" }, { "labSpecStatus": 1 })