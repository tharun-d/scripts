var count = 0
var tcFindQuery = {
    "general.aebasVerified": true,
    "jobRoles.sscStatus": "Conditionally Accrediated",
}
db.getCollection('trainingcentre').find(tcFindQuery, { userName: 1, jobRoles: 1 }).forEach(tcDetails => {
    if (tcDetails) {
        tcFindQuery["userName"] = tcDetails["userName"]
        if (tcDetails["jobRoles"]) {
            tcDetails.jobRoles.forEach(jobRoleValue => {
                if (jobRoleValue["sscStatus"] == "Conditionally Accrediated") {
                    print(jobRoleValue.qp, tcDetails["userName"])
                    var isTot = true
                    jobRoleValue["associatedTrainer"].forEach(asTr => {
                        var associatedTrFromTot = db.trainer.aggregate([
                            {
                                $match: {
                                    "userName":
                                        asTr["userName"],
                                }
                            },
                            { $unwind: "$jobRoles" },
                            {
                                $match: {
                                    "jobRoles.jobRoleId": jobRoleValue["qp"],
                                    "jobRoles.isCertified": true
                                }
                            }, {
                                $project: {
                                    _id: 0,
                                    "jobRoles.isCertified": 1
                                }
                            }
                        ]).toArray()
                        if (associatedTrFromTot) {
                            if (associatedTrFromTot.length != 0) {
                                asTr["sscVerifyTOTCertified"] = true
                            } else {
                                isTot = false
                            }
                        } else {
                            isTot = false
                        }
                    })
                    var isNeisbudCount = db.tcworkflow.find({
                        "tcId": tcDetails["userName"],
                        requestType: "NIESBUDRequest",
                        "status": "Approved",
                    }).toArray()
                    if (isNeisbudCount && isNeisbudCount.length) {
                        if (isTot) {
                            jobRoleValue["status"] = "Accrediated"
                            jobRoleValue["sscStatus"] = "Accrediated"
                            jobRoleValue["accHappendWhere"] = "through cron"
                            jobRoleValue["accHappendWhen"] = new Date()
                            db.getCollection('recommendation_report').updateOne({ "tcId": tcDetails.userName, "jobRole.qpCode": jobRoleValue.qp }, { "$set": { "sscAccreditationStatus": "Accrediated", "Accrediated_on": new Date(), accHappendWhere: "through cron" } })
                        }
                    }
                }
            })
            var cron = {
                "message": "this cron is for Condi acc",
            }
            var updateQuery = {
                "$set": {
                    "jobRoles": tcDetails.jobRoles,
                    "cron": cron
                }
            }
            err = db.getCollection('trainingcentre').update(tcFindQuery, updateQuery)
            if (err.nModified) {
                print("->", count++, tcDetails["userName"])
            }
        }
    }
})