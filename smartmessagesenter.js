db.smartmessagecenter.find({ "tcid": "TC126134" })
db.smartmessagecenter.find({ "tcid": "TC041534" }, { "stages": 1 })
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
stages = [
    {
        "stage": "Application No. Generated.",
        "stageDate": ISODate("2019-12-28T13:05:31.748Z")
    },
    {
        "stage": "CAAF submitted and application is under assessment. At this stage, you cannot edit your CAAF.",
        "stageDate": ISODate("2019-12-29T12:17:56.975Z")
    },
    {
        "stage": "Application is marked as ‘Deemed Not Ready’ (1st Time). You can re-submit the CAAF.",
        "stageDate": ISODate("2019-12-30T06:48:19.585Z")
    },
    {
        "stage": "TC applied for Centre Withdrawl.",
        "stageDate": ISODate("2020-03-15T20:06:47.959Z")
    },
    {
        "stage": "Finance SPOC has approved the withdrawal request. Remarks: Account Holder as TP Name.",
        "stageDate": ISODate("2020-06-19T11:11:56.886Z")
    }
]

db.smartmessagecenter.update({ "tcid": "TC129415" }, { "$pop": { "stages": 1 } })
db.smartmessagecenter.update({ "tcid": "TC129415" }, { "$pop": { "messages": 1 } })