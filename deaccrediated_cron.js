var todayDate = moment(new Date());
db.collection("trainingcentre").find({ "processType": "Accreditation & Affiliation" }).forEach((tcData) => {
    if (tcData.jobRoles && tcData.jobRoles.length) {
        for (var i = 0; i < tcData.jobRoles.length; i++) {
            if (tcData.jobRoles[i].sscStatus && tcData.jobRoles[i].accrediatedOn) {
                var accrediatedOn = moment(tcData.jobRoles[i].accrediatedOn);
                var yearDiff = todayDate.diff(accrediatedOn, 'years');
                console.log("yearDiff--->", yearDiff)
                if ((tcData.jobRoles[i].sscStatus == "Accrediated" || tcData.jobRoles[i].sscStatus == "Conditionally Accrediated") && (tcData.trainingCenterType === "NON PMKK" || tcData.trainingCenterType === "Government")) {
                    if (yearDiff >= 1) {
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
                            db.collection('tcworkflow').updateOne({ "tcId": tcData.userName, "jobRole.qp": tcData.jobRoles[i].qp }, { "$set": { "status": "deaccrediated", "deaccrediatedOn": new Date() } })
                        }
                    }
                }
                console.log("date", todayDate._d)
                console.log("accrediatedOndate", tcData.jobRoles[i].accrediatedOn)
                console.log("trainingCenterType", tcData.trainingCenterType)
                if (tcData.trainingCenterType === "PMKK" || tcData.trainingCenterType === "PMKK SPOKE") {
                    if (tcData.jobRoles[i].sscStatus === 'Conditionally Accrediated') {
                        if (yearDiff >= 1) {
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
                                db.collection('tcworkflow').updateOne({ "tcId": tcData.userName, "jobRole.qp": tcData.jobRoles[i].qp }, { "$set": { "status": "deaccrediated", "deaccrediatedOn": new Date() } })
                            }
                        }
                    } else if (tcData.jobRoles[i].sscStatus === 'Accrediated') {
                        if (yearDiff >= 2) {
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
                                db.collection('tcworkflow').updateOne({ "tcId": tcData.userName, "jobRole.qp": tcData.jobRoles[i].qp }, { "$set": { "status": "deaccrediated", "deaccrediatedOn": new Date() } })
                            }
                        }
                    }
                }
                db.collection('expiredTcInfo').insert({ yearDiff: yearDiff, accDate: tcData.jobRoles[i].old_accrediatedOn, userName: tcData.userName, qp: tcData.jobRoles[i].qp, upatedOn: new Date() })
            }
        }
        db.collection('trainingcentre').updateOne({ "_id": tcData._id }, { "$set": { "jobRoles": tcData.jobRoles } });
    }
});