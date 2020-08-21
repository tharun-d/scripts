db.trainingcentre.find({ "userName": "TC300022", "processType": "Accreditation & Affiliation" }).forEach((tcData) => {
    if (tcData.jobRoles && tcData.jobRoles.length) {
        for (var i = 0; i < tcData.jobRoles.length; i++) {
            if (tcData.jobRoles[i].sscStatus && tcData.jobRoles[i].accrediatedOn) {
                if ((tcData.jobRoles[i].sscStatus == "Accrediated" || tcData.jobRoles[i].sscStatus == "Conditionally Accrediated") && (tcData.trainingCenterType === "NON PMKK" || tcData.trainingCenterType === "Government")) {
                    if (true) {
                        tcData.jobRoles[i].old_sscStatus = tcData.jobRoles[i].sscStatus;
                        tcData.jobRoles[i].sscStatus = "deaccrediated";
                        tcData.jobRoles[i].old_status = tcData.jobRoles[i].status;
                        tcData.jobRoles[i].status = "deaccrediated";
                        tcData.jobRoles[i].old_accrediatedOn = tcData.jobRoles[i].accrediatedOn;
                        tcData.jobRoles[i].accrediatedOn = null;
                        tcData.jobRoles[i].deaccrediatedOn = new Date();
                        if (tcData.jobRoles[i].affiliationDone) {
                            tcData.jobRoles[i].affiliationDone = false;
                        }
                        if (tcData.jobRoles[i].accCert) {
                            tcData.jobRoles[i].old_accCert = tcData.jobRoles[i].accCert;
                            tcData.jobRoles[i].accCert = [];
                        }
                        tcData.jobRoles[i].cron = true;
                        if (tcData.jobRoles[i].qp) {
                            db.tcworkflow.update({ "tcId": tcData.userName, "jobRole.qp": tcData.jobRoles[i].qp }, { "$set": { "status": "deaccrediated", "deaccrediatedOn": new Date() } })
                        }
                    }
                }

                if (tcData.trainingCenterType === "PMKK" || tcData.trainingCenterType === "PMKK SPOKE") {
                    if (tcData.jobRoles[i].sscStatus === 'Conditionally Accrediated') {
                        if (true) {
                            tcData.jobRoles[i].old_sscStatus = tcData.jobRoles[i].sscStatus;
                            tcData.jobRoles[i].sscStatus = "deaccrediated";
                            tcData.jobRoles[i].old_status = tcData.jobRoles[i].status;
                            tcData.jobRoles[i].status = "deaccrediated";
                            tcData.jobRoles[i].old_accrediatedOn = tcData.jobRoles[i].accrediatedOn;
                            tcData.jobRoles[i].accrediatedOn = null;
                            tcData.jobRoles[i].deaccrediatedOn = new Date();
                            if (tcData.jobRoles[i].affiliationDone) {
                                tcData.jobRoles[i].affiliationDone = false;
                            }
                            if (tcData.jobRoles[i].accCert) {
                                tcData.jobRoles[i].old_accCert = tcData.jobRoles[i].accCert;
                                tcData.jobRoles[i].accCert = [];
                            }
                            tcData.jobRoles[i].cron = true;
                            if (tcData.jobRoles[i].qp) {
                                db.tcworkflow.updateOne({ "tcId": tcData.userName, "jobRole.qp": tcData.jobRoles[i].qp }, { "$set": { "status": "deaccrediated", "deaccrediatedOn": new Date() } })
                            }
                        }
                    } else if (tcData.jobRoles[i].sscStatus === 'Accrediated') {
                        if (true) {
                            tcData.jobRoles[i].old_sscStatus = tcData.jobRoles[i].sscStatus;
                            tcData.jobRoles[i].sscStatus = "deaccrediated";
                            tcData.jobRoles[i].old_status = tcData.jobRoles[i].status;
                            tcData.jobRoles[i].status = "deaccrediated";
                            tcData.jobRoles[i].old_accrediatedOn = tcData.jobRoles[i].accrediatedOn;
                            tcData.jobRoles[i].accrediatedOn = null;
                            tcData.jobRoles[i].deaccrediatedOn = new Date();
                            if (tcData.jobRoles[i].affiliationDone) {
                                tcData.jobRoles[i].affiliationDone = false;
                            }
                            if (tcData.jobRoles[i].accCert) {
                                tcData.jobRoles[i].old_accCert = tcData.jobRoles[i].accCert;
                                tcData.jobRoles[i].accCert = [];
                            }
                            tcData.jobRoles[i].cron = true;
                            if (tcData.jobRoles[i].qp) {
                                db.tcworkflow.update({ "tcId": tcData.userName, "jobRole.qp": tcData.jobRoles[i].qp }, { "$set": { "status": "deaccrediated", "deaccrediatedOn": new Date() } })
                            }
                        }
                    }
                }
               // db.expiredTcInfo.insert({ yearDiff: yearDiff, accDate: tcData.jobRoles[i].old_accrediatedOn, userName: tcData.userName, qp: tcData.jobRoles[i].qp, upatedOn: new Date() })
            }
        }
        db.trainingcentre.update({ "_id": tcData._id }, { "$set": { "jobRoles": tcData.jobRoles , status: "DEACCREDIATED" }});
    }
});