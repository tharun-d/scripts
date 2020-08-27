http://localhost:3030/api/smart/v1/trainingcentre/cm/emailinformation
http://13.233.175.254/api/smart/v1/trainingcentre/cm/emailinformation


db.trainingcentre.find({ "processType": "Accreditation & Affiliation", "jobRoles": { "$exists": true } }).forEach(tcData => {

    aebasCount = db.tcworkflow.find({
        "tcId": tcData["userName"],
        "status": "Approved",
        "requestType": { "$in": ["Aebas Request"] },
    }).count()

    if (tcData["jobRoles"]) {
        for (var i = 0; i < tcData["jobRoles"].length; i++) {
            if (tcData["jobRoles"][i]["scheme"] && tcData["jobRoles"][i]["scheme"]["name"]) {

                if (tcData["jobRoles"][i]["scheme"]["name"] == "MIDH (Mission for Integrated Horticulture)" || tcData["jobRoles"][i]["scheme"]["name"] == "RKVY (Rashtriya Krishi Vikas Yojna)") {

                    if (tcData["jobRoles"][i]["associatedTrainer"]) {
                        for (var j = 0; j < tcData["jobRoles"][i]["associatedTrainer"].length; j++) {

                            if (tcData["jobRoles"][i]["associatedTrainer"][j]) {
                                var finalData = {}
                                finalData["qpCode"] = tcData["jobRoles"][i]["qp"]
                                finalData["tcId"] = tcData["userName"]
                                finalData["_id"] = new ObjectId()
                                finalData["trainerId"] = tcData["jobRoles"][i]["associatedTrainer"][j]["userName"]
                                var associatedTrFromTot = db.trainer.aggregate([
                                    {
                                        $match: {
                                            "userName":
                                                tcData["jobRoles"][i]["associatedTrainer"][j]["userName"],
                                        }
                                    },
                                    { $unwind: "$jobRoles" },
                                    {
                                        $match: {
                                            "jobRoles.jobRoleId": finalData["qpCode"],
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
                                        finalData["totCertified"] = "Yes"
                                    } else {
                                        finalData["totCertified"] = "No"
                                    }
                                } else {
                                    finalData["totCertified"] = "No"
                                }
                                niesCount = db.tcworkflow.find({
                                    "tcId": tcData["userName"],
                                    "status": "Approved",
                                    "requestType": { "$in": ["NIESBUDRequest"] },
                                    "CATCData.associatedTrainer.userName": tcData["jobRoles"][i]["associatedTrainer"][j]["userName"]
                                }).count()
                                if (niesCount > 0) {
                                    finalData["NIESBURD"] = "Yes"
                                } else {
                                    finalData["NIESBURD"] = "No"
                                }
                                if (aebasCount > 0) {
                                    finalData["Aebas"] = "Approved"
                                } else {
                                    finalData["Aebas"] = "Not Approved"
                                }
                                db.smartTempTOT.insert(finalData)
                            }
                        }
                    }
                }
            }
        }
    }
})

db.smartTempTOT.remove({})
db.trainingcentre.find({ "processType": "Accreditation & Affiliation", "jobRoles": { "$exists": true } }).forEach(tcData => {

    aebasCount = db.tcworkflow.find({
        "tcId": tcData["userName"],
        "status": "Approved",
        "requestType": { "$in": ["Aebas Request"] },
    }).count()

    if (tcData["jobRoles"]) {
        for (var i = 0; i < tcData["jobRoles"].length; i++) {
            if (tcData["jobRoles"][i]["sscStatus"] && tcData["jobRoles"][i]["sscStatus"] == "Conditionally Accrediated") {

                if (tcData["jobRoles"][i]["associatedTrainer"]) {
                    for (var j = 0; j < tcData["jobRoles"][i]["associatedTrainer"].length; j++) {
                        if (tcData["jobRoles"][i]["associatedTrainer"][j]["userName"]) {
                            var finalData = {}

                            finalData["jobRoleName"] = tcData["jobRoles"][i]["name"]

                            finalData["qpCode"] = tcData["jobRoles"][i]["qp"]
                            finalData["tcId"] = tcData["userName"]
                            finalData["_id"] = new ObjectId()
                            finalData["trainerId"] = tcData["jobRoles"][i]["associatedTrainer"][j]["userName"]

                            var associatedTrFromTot = db.trainer.aggregate([
                                {
                                    $match: {
                                        "userName":
                                            tcData["jobRoles"][i]["associatedTrainer"][j]["userName"],
                                    }
                                },
                                { $unwind: "$jobRoles" },
                                {
                                    $match: {
                                        "jobRoles.jobRoleId": finalData["qpCode"],
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
                                    finalData["totCertified"] = "Yes"
                                } else {
                                    finalData["totCertified"] = "No"
                                }
                            } else {
                                finalData["totCertified"] = "No"
                            }
                            niesCount = db.tcworkflow.find({
                                "tcId": tcData["userName"],
                                "status": "Approved",
                                "requestType": { "$in": ["NIESBUDRequest"] },
                                "CATCData.associatedTrainer.userName": tcData["jobRoles"][i]["associatedTrainer"][j]["userName"]
                            }).count()
                            if (niesCount > 0) {
                                finalData["NIESBURD"] = "Yes"
                            } else {
                                finalData["NIESBURD"] = "No"
                            }
                            if (aebasCount > 0) {
                                finalData["Aebas"] = "Approved"
                            } else {
                                finalData["Aebas"] = "Not Approved"
                            }
                            //printjson(finalData)
                            db.smartTempTOT.insert(finalData)
                        }
                    }
                }
            }
        }
    }
})