db.smartmessagecenter.find({ "tcid": "TC126134" })
db.smartmessagecenter.find({ "tcid": "TC107330" }, { "stages": 1 })
db.smartmessagecenter.insert(
    {
        "tcid": "TC126358",
        "stages": [
            {
                "stage": "Residential Facility Inspection was completed on 03/07/2020. Inspection Report is Under Evaluation.",
                "stageDate": new Date(),
            }
        ],
        "messages": []
    }
)

//TC002642
for (var i = 1; i <= 6; i++) {
    print("removing last message center in TC002642: ", i)
    db.smartmessagecenter.update({ "tcid": "TC002642" }, { "$pop": { "stages": 1 } })
}

//TC008189
for (var i = 1; i <= 7; i++) {
    print("removing last message center in TC008189: ", i)
    db.smartmessagecenter.update({ "tcid": "TC008189" }, { "$pop": { "stages": 1 } })
}

//TC021387
db.smartmessagecenter.update({ "tcid": "TC021387" }, { "$pop": { "stages": 1 } })

//TC063610
db.smartmessagecenter.update({ "tcid": "TC063610" }, { "$pop": { "stages": 1 } })

//TC041395

stages = [
    {
        "stage": "TC has accepted Inspection date as 05/07/2018.",
        "stageDate": ISODate("2018-06-30T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-06-30T17:38:16+0530"
    },
    {
        "stage": "Your Application is Under Re-assessment Review (Second Time).",
        "stageDate": ISODate("2018-04-27T00:00:00Z"),
        "actionType": "TC1",
        "prevstgDate": "2018-04-27T13:12:56+0530"
    },
    {
        "stage": "Application is marked as Deemed Not Ready by DA for (First Time).",
        "stageDate": ISODate("2018-03-28T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-03-28T7:45:43+0530"
    },
    {
        "stage": "Application has been Un-blocked. You can edit & submit your CAAF again.",
        "stageDate": ISODate("2018-06-08T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-06-08T14:6:1+0530"
    },
    {
        "stage": "Your Application is Under Re-assessment Review (Third Time).",
        "stageDate": ISODate("2018-05-18T00:00:00Z"),
        "actionType": "TC1",
        "prevstgDate": "2018-05-18T12:7:13+0530"
    },
    {
        "stage": "Training Centre is marked as Qualified by Inspection Agency. Kindly check the Job Role Status under Job Role Wise application status Tab. You may opt Appeal Process if you have any grievances within 7 days of receiving Inspection report.",
        "stageDate": ISODate("2018-07-09T00:00:00Z"),
        "actionType": "Sav",
        "prevstgDate": "2018-07-09T1:17:36+0530"
    },
    {
        "stage": "CAAF submitted successfully as application fees is paid. Your Application is Under Review.",
        "stageDate": ISODate("2018-03-25T00:00:00Z"),
        "actionType": "Sav",
        "prevstgDate": "2018-03-25T14:44:21+0530"
    },
    {
        "stage": "Your Application is Under Assessment Review.",
        "stageDate": ISODate("2018-06-27T00:00:00Z"),
        "actionType": "TC1",
        "prevstgDate": "2018-06-27T11:45:50+0530"
    },
    {
        "stage": "Application No. Generated.",
        "stageDate": ISODate("2018-03-20T00:00:00Z"),
        "actionType": "1",
        "prevstgDate": "2018-03-20T16:43:44+0530"
    },
    {
        "stage": "Application is marked as Deemed Not Ready by DA for (Second Time).",
        "stageDate": ISODate("2018-05-02T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-05-02T11:34:8+0530"
    },
    {
        "stage": "SSC has marked the Job Role as Conditionally Accredited. Please pay Continuous Monitoring Fees and Affiliation Fees.",
        "stageDate": ISODate("2018-08-07T00:00:00Z"),
        "actionType": "1",
        "prevstgDate": "2018-08-07T20:41:39+0530"
    },
    {
        "stage": "SMART Application Alert",
        "stageDate": ISODate("2018-06-04T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-06-04T9:8:4+0530"
    },
    {
        "stage": "Application is marked as Deemed Not Ready by DA for (Third Time). Hence application blocked!",
        "stageDate": ISODate("2018-06-04T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-06-04T9:8:4+0530"
    },
    {
        "stage": "Application is marked as Deemed Ready by DA. Your application is now assigned to Inspection Agency for Inspection Scheduling.",
        "stageDate": ISODate("2018-06-29T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-06-29T9:2:50+0530"
    },
    {
        "stage": "Inspection date has been assigned to your Centre by Inspection Agency.",
        "stageDate": ISODate("2018-06-30T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-06-30T12:58:5+0530"
    },
    {
        "stage": "Inspection completed on 05/07/2018. Your Inspection Report is Under Evaluation.",
        "stageDate": ISODate("2018-07-05T00:00:00Z"),
        "actionType": "Sav",
        "prevstgDate": "2018-07-05T14:46:5+0530"
    },
    {
        "stage": "SSC has marked the Job Roles as Conditionally Affiliated.",
        "stageDate": ISODate("2018-09-07T00:00:00Z"),
        "actionType": "1",
        "prevstgDate": "2018-09-07T11:19:31+0530"
    },
    {
        "stage": "Application has been approved for “Warehouse Supervisor” job roles, by respective scheme. Please note only the scheme approved job roles would be inspected. In case of re-inspection, already scheme approved job roles would also be inspected.",
        "stageDate": ISODate("2018-08-31T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-08-31T15:47:27+0530"
    },
    {
        "stage": "SMART Application Alert",
        "stageDate": ISODate("2018-08-31T00:00:00Z"),
        "actionType": "Sav",
        "prevstgDate": "2018-08-31T12:3:7+0530"
    },
    {
        "stage": "Applied for scheme approval for 'Warehouse Supervisor, Telecaller'  job role/s.",
        "stageDate": ISODate("2018-08-31T00:00:00Z"),
        "actionType": "1",
        "prevstgDate": "2018-08-31T12:3:7+0530"
    },
    {
        "stage": "Application has been approved for “Telecaller” job roles, by respective scheme. Please note only the scheme approved job roles would be inspected. In case of re-inspection, already scheme approved job roles would also be inspected.",
        "stageDate": ISODate("2018-08-31T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-08-31T15:47:47+0530"
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2019-09-10T13:29:21.669Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ (1st Time). You can re-submit the CAAF.",
        "stageDate": ISODate("2019-09-11T10:21:25.129Z")
    },
    {
        "stage": "Your Application is Under assessment (2nd Time).At this stage, you cannot edit your CAAF",
        "stageDate": ISODate("2019-09-27T12:39:05.728Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ (2nd Time). You can re-submit the CAAF.",
        "stageDate": ISODate("2019-09-28T06:42:48.098Z")
    },
    {
        "stage": "TC applied for Centre Withdrawl.",
        "stageDate": ISODate("2020-07-20T04:52:10.499Z")
    }
]


db.smartmessagecenter.update({ "tcid": "TC041534" }, { "$set": { "stages": stages } })

//TC117629
db.smartmessagecenter.update({ "tcid": "TC117629" }, { "$pop": { "stages": 1 } })

//TC117697


db.smartmessagecenter.update({ "tcid": "TC129415" }, { "$pop": { "stages": 1 } })
db.smartmessagecenter.update({ "tcid": "TC129415" }, { "$pop": { "messages": 1 } })


stages = [
    {
        "stage": "TC generated.",
        "stageDate": ISODate("2019-09-03T04:48:32.838Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2019-09-27T10:24:10.834Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2019-09-30T06:02:14.272Z")
    },
    {
        "stage": "TC applied for Centre Withdrawl.",
        "stageDate": ISODate("2020-09-30T07:59:29.512Z")
    },
]
db.smartmessagecenter.update({ "tcid": "TC107330" }, { "$set": { "stages": stages } })

db.smartmessagecenter.update({ "tcid": "TC107330" }, { "$pop": { "stages": 1 } })

stages = {
    "stage": "TC applied for Centre Withdrawl.",
    "stageDate": ISODate("2019-09-30T07:59:29.512Z")
}
db.smartmessagecenter.update({ "tcid": "TC107330" }, { "$push": { "stages": stages } })

stages = [
    {
        "stage": "Application No. Generated.",
        "stageDate": ISODate("2020-01-02T09:08:01.119Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2020-02-01T10:15:30.829Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ (1st Time). You can re-submit the CAAF.",
        "stageDate": ISODate("2020-02-03T09:12:12.941Z")
    },
    {
        "stage": "Your Application is Under assessment (2nd Time).At this stage, you cannot edit your CAAF",
        "stageDate": ISODate("2020-02-26T12:10:51.368Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. You have last chance to submit your application.",
        "stageDate": ISODate("2020-02-27T07:03:00.030Z")
    },
    {
        "stage": "Your Application is Under assessment (3rd Time).At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2020-02-28T10:52:11.481Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2020-03-03T08:22:51.107Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st time. You can re-submit the CAAF.",
        "stageDate": ISODate("2020-03-04T10:30:12.228Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 3rd time. Hence, blocked. You can pay the Unblocking fees to re-submit CAAF.",
        "stageDate": ISODate("2020-03-05T07:59:40.986Z")
    }
]

db.smartmessagecenter.update({ "tcid": "TC118069" }, { "$set": { "stages": stages } })

////

//TC128592
stages = [
    {
        "stage": "TC generated.",
        "stageDate": ISODate("2020-05-21T08:32:58.465Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-22T07:45:51.370Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-05-26T03:21:31.735Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-26T07:29:22.614Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-05-27T06:26:40.460Z")
    },
    {
        "stage": "Application is Under assessment (3rd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-28T07:26:20.525Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 3rd time. Hence, blocked. TC can pay the Unblocking fees to re-submit CAAF.",
        "stageDate": ISODate("2020-05-29T11:59:29.814Z")
    },
    {
        "stage": "Application has been Un-blocked. You can edit & submit your CAAF again.",
        "stageDate": ISODate("2020-06-16T12:37:21.642Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.293Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-24T18:29:16.738Z")
    }
]
db.smartmessagecenter.update({ "tcid": "TC128592" }, { "$set": { "stages": stages } })

//TC128265
stages = [

    {
        "stage": "TC generated.",
        "stageDate": ISODate("2020-05-01T15:10:44.268Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-10T06:00:49.481Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-06-12T10:02:13.541Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-12T16:05:58.579Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-06-15T14:22:46.749Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.286Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-25T03:29:29.900Z")
    }
]
db.smartmessagecenter.update({ "tcid": "TC128265" }, { "$set": { "stages": stages } })


//TC127760
stages = [
    {
        "stage": "TC generated.",
        "stageDate": ISODate("2020-03-25T05:36:03.180Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-23T15:00:01.145Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-05-26T13:51:50.589Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-01T11:11:38.312Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-06-02T06:53:26.009Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.281Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-25T03:19:53.943Z")
    }

]
db.smartmessagecenter.update({ "tcid": "TC127760" }, { "$set": { "stages": stages } })

//TC128167
stages = [
    {
        "stage": "TC generated.",
        "stageDate": ISODate("2020-04-24T13:44:12.660Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-04-29T14:34:35.791Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-04-30T16:50:14.438Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-07T13:42:30.826Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-05-08T06:53:36.466Z")
    },
    {
        "stage": "Application is Under assessment (3rd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-09T12:20:27.440Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 3rd time. Hence, blocked. TC can pay the Unblocking fees to re-submit CAAF.",
        "stageDate": ISODate("2020-05-11T08:00:25.039Z")
    },
    {
        "stage": "Application has been Un-blocked. You can edit & submit your CAAF again.",
        "stageDate": ISODate("2020-05-18T06:44:38.902Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-26T07:32:11.374Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-05-27T06:45:40.709Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-05-27T07:41:01.447Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-05-29T03:25:21.309Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.283Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-24T18:40:05.824Z")
    },
    {
        "stage": "Applied for scheme approval for Electrician Domestic Solutions  job role",
        "stageDate": ISODate("2020-06-25T10:14:54.205Z")
    },
    {
        "stage": "Applied for scheme approval for Self Employed Tailor job role",
        "stageDate": ISODate("2020-06-25T10:16:29.828Z")
    },
    {
        "stage": "Application has not been approved for Self Employed Tailor job roles, by respective scheme.Please note only the scheme approved job roles would be inspected. In case of re-inspection, already inspected Job Roles mapped to respective scheme would be inspected",
        "stageDate": ISODate("2020-07-09T08:58:57.917Z")
    },
    {
        "stage": "Application has not been approved for Electrician Domestic Solutions  job roles, by respective scheme.Please note only the scheme approved job roles would be inspected. In case of re-inspection, already inspected Job Roles mapped to respective scheme would be inspected",
        "stageDate": ISODate("2020-07-09T08:59:09.310Z")
    },
    {
        "stage": "Applied for scheme approval for Electrician Domestic Solutions  job role",
        "stageDate": ISODate("2020-07-10T11:06:45.116Z")
    },
    {
        "stage": "Applied for scheme approval for Self Employed Tailor job role",
        "stageDate": ISODate("2020-07-10T11:10:58.270Z")
    },
    {
        "stage": "Application has been approved for Electrician Domestic Solutions  job roles, by respective scheme.Please note only the scheme approved job roles would be inspected. In case of re-inspection, already inspected Job Roles mapped to respective scheme would be inspected",
        "stageDate": ISODate("2020-08-20T10:32:48.493Z")
    }
]
db.smartmessagecenter.update({ "tcid": "TC128167" }, { "$set": { "stages": stages } })

//TC129326
stages = [
    {
        "stage": "TC generated.",
        "stageDate": ISODate("2020-06-08T10:08:27.191Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-09T11:39:19.151Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-06-10T06:04:01.447Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-11T07:13:51.506Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-06-12T12:43:46.581Z")
    },
    {
        "stage": "Application is Under assessment (3rd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-14T11:20:56.284Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 3rd time. Hence, blocked. TC can pay the Unblocking fees to re-submit CAAF.",
        "stageDate": ISODate("2020-06-15T06:53:25.062Z")
    },
    {
        "stage": "Application has been Un-blocked. You can edit & submit your CAAF again.",
        "stageDate": ISODate("2020-06-15T15:52:56.290Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.298Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-25T05:24:02.073Z")
    }
]
db.smartmessagecenter.update({ "tcid": "TC129326" }, { "$set": { "stages": stages } })

//TC113545
stages = [
    {
        "stage": "Application No. Generated.",
        "stageDate": ISODate("2019-11-20T06:03:42.731Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2020-01-14T05:04:09.025Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ (1st Time). You can re-submit the CAAF.",
        "stageDate": ISODate("2020-01-17T10:14:22.498Z")
    },
    {
        "stage": "Your Application is Under assessment (2nd Time).At this stage, you cannot edit your CAAF",
        "stageDate": ISODate("2020-02-05T13:09:47.141Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. You have last chance to submit your application.",
        "stageDate": ISODate("2020-02-06T10:38:54.142Z")
    },
    {
        "stage": "Your Application is Under assessment (3rd Time).At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2020-02-21T04:31:04.666Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 3rd time. Hence, blocked. You can pay the Unblocking fees to re-submit CAAF.",
        "stageDate": ISODate("2020-02-21T09:34:09.916Z")
    },
    {
        "stage": "Application has been Un-blocked. You can edit & submit your CAAF again.",
        "stageDate": ISODate("2020-05-31T06:10:05.876Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.260Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-24T15:11:03.023Z")
    }
]
db.smartmessagecenter.update({ "tcid": "TC113545" }, { "$set": { "stages": stages } })

//TC128265
stages = [
    {
        "stage": "TC generated.",
        "stageDate": ISODate("2020-05-01T15:10:44.268Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment (1st Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-10T06:00:49.481Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-06-12T10:02:13.541Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-12T16:05:58.579Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-06-15T14:22:46.749Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-06-24T08:41:49.286Z")
    },
    {
        "stage": "TC has been accorded 'Deemed Ready' status. Letter of Registration (LoR) has been generated. TC can apply for inspection once at-least one job role is Scheme Approved.",
        "stageDate": ISODate("2020-06-25T03:29:29.900Z")
    }
]

db.smartmessagecenter.update({ "tcid": "TC128265" }, { "$set": { "stages": stages } })

db.trainingcentre.update({ userName: "TC128265" }, { "$set": { "submittedOn": ISODate("2020-06-24T08:41:49.286Z") } })


//TC041168
stages = [
    {
        "stage": "CAAF submitted but application fee is pending. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2018-05-14T00:00:00Z"),
        "actionType": "Sav",
        "prevstgDate": "2018-05-14T16:29:45+0530"
    },
    {
        "stage": "CAAF submitted successfully as application fees is paid. Your Application is Under Review.",
        "stageDate": ISODate("2018-05-15T00:00:00Z"),
        "actionType": "Sav",
        "prevstgDate": "2018-05-15T9:47:38+0530"
    },
    {
        "stage": "SMART Application Alert",
        "stageDate": ISODate("2018-02-26T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-02-26T11:23:16+0530"
    },
    {
        "stage": "Application is marked as Deemed Not Ready (First Time). You can re-submit the CAAF again.",
        "stageDate": ISODate("2018-09-14T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2018-09-14T14:8:30+0530"
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’(Second Time).",
        "stageDate": ISODate("2019-01-28T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2019-01-28T23:40:41+0530"
    },
    {
        "stage": "Your Application is Under Assessment (Second Time).",
        "stageDate": ISODate("2019-01-25T00:00:00Z"),
        "actionType": "",
        "prevstgDate": "2019-01-25T10:29:48+0530"
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2020-01-27T09:01:11.189Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 1st Time. TC can re-submit the CAAF.",
        "stageDate": ISODate("2020-06-01T15:45:56.755Z")
    },
    {
        "stage": "Application is Under assessment (2nd Time). At this stage, TC cannot edit the CAAF.",
        "stageDate": ISODate("2020-09-28T11:35:36.716Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ 2nd time. Last chance to submit the CAAF.",
        "stageDate": ISODate("2020-10-02T07:23:39.570Z")
    }
]

db.smartmessagecenter.update({ "tcid": "TC041168" }, { "$set": { "stages": stages } })


db.tcworkflow.update({ "_id": ObjectId("5f845fabfc40e704c20711cf"), "tcId": "TC132894" },
    { "$set": { "status": "Conditionally Accrediated", "jobRole.status": "Conditionally Accrediated" } })


db.trainingcentre.update({ userName: "TC132894" },
    { "$set": { "jobRoles.1.status": "Conditionally Accrediated", "jobRoles.1.sscStatus": "Conditionally Accrediated" } })


db.smartmessagecenter.update({ "tcid": "TC061896" }, { "$pop": { "messages": 1 } })

stages = {
    "stage": "Inspection Planning Under Progress",
    "stageDate": ISODate("2020-12-04T11:30:57.360Z"),
}

db.smartmessagecenter.update({ "tcid": "TC061896" }, { "$push": { "stages": stages } })

db.residentialworkflow.remove({ tcId: "TC141326", _id: { "$nin": [ObjectId("605ef2afd01f71057e9f9b30")] } })

db.smartmessagecenter.update({ "tcid": "TC141326" }, { "$pop": { "stages": 1 } })
db.smartmessagecenter.update({ "tcid": "TC141326" }, { "$pop": { "stages": 1 } })
db.smartmessagecenter.update({ "tcid": "TC141326" }, { "$pop": { "stages": 1 } })
db.smartmessagecenter.update({ "tcid": "TC141326" }, { "$pop": { "stages": 1 } })