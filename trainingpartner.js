db.trainingpartner.find({ "generalDetailsOfTP.typeOfOrganisation": "Government Institute" }, { userName: 1 }).sort({ _id: -1 })

db.trainingpartner.distinct("generalDetailsOfTP.typeOfOrganisation")

db.trainingpartner.find({ userName: "TP200178" }, { isSmart: 1, "tpSchemeDetails.approvalProcess": 1 })

db.trainingpartner.distinct("tpSchemeDetails.approvalProcess")

db.trainingpartner.find({ "userName": "TP034416" }, { "generalDetailsOfTP.typeOfOrganisation": 1 }).sort({ _id: -1 })

db.trainingpartner.update({ userName: "TP056921" },
    { $unset: { "financial": "", "gstDetails": "" } })

db.trainingcentre.update({ "userName": "TC120412" },
    { $set: { "trainingPartner.type": "Government Institute", status: "TC_CREATED" } })

db.tcworkflow.remove({ tcId: "TC120412" })

db.refundPayments.update({ "trainingPartner.userName": "TP034416" },
    {
        $set: {
            "trainingPartner.type": "Proprietorship",
            "trainingPartner.userName": "TP034416"
        }
    })

db.trainingcentre.find({ "trainingPartner.type": { "$exists": false }, "processType": "Accreditation & Affiliation" }).forEach(data => {
    var tp = db.trainingpartner.findOne({ userName: data["trainingPartner"]["userName"] })
    if (tp && tp["generalDetailsOfTP"]["typeOfOrganisation"]) {
        print(tp["generalDetailsOfTP"]["typeOfOrganisation"])
        data["trainingPartner"]["type"] = tp["generalDetailsOfTP"]["typeOfOrganisation"]
        // db.trainingcentre.save(data)
    }
})
db.trainingpartner.find({ "userName": { "$in": ["TP049618"] } }).forEach(x => {
    x['spoc'] = x['old_spoc']
    delete x['isMnlUpt']
    delete x['isMnlUptDt']
    delete x['old_spoc']
    delete x["old_pan"]
    delete x['deactivationRemarks']
    x['financial']['pan'] = x['old_pan']
    x['status'] = "DAREJECTED"
    db.trainingpartner.save(x)
    db.users.update({ "userName": x['userName'] }, { "$set": { "email": x['spoc']['email'], "phone.mobile": x['spoc']['mobileNumber'] } })
})

db.trainingpartner.find({ userName: "Tp003761" }, { "generalDetailsOfTP.typeOfOrganisation": 1 }).pretty()
db.trainingpartner.find({ "generalDetailsOfTP.typeOfOrganisation": { "$exists": true } }).count()


db.trainingpartner.update({ "userName": "TP005079" }, { "$set": { "financial.pan": "AAATB5657N" } })