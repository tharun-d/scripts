db.specificationreport.updateMany({ "labAreaSpecifiactionDisclaimerUpdatedOn": { "$exists": true } },
    { "$set": { "labAreaSpecifiactionDisclaimer": "yes" } })

db.trainingcentre.updateMany(
    { "trainingCenterType": "Government", "trainingPartner.type": "Government Institute" },
    { "$unset": { "inspectionProcess": "" } })