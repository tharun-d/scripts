db.cmStatusLog.remove({})
db.cmStatusLog.find({})
db.cmStatusLog.insert(
	{
		"tcUserName": "TC1500362",
		"year": 2020,
		"dateCreated": new Date(),
		"lastUpdated": new Date(),
		"quarterNumber": 1,
		"paymentDate": ISODate("2020-04-29T09:57:10.499Z"),
		"quarterEndDate": ISODate("2020-07-29T09:57:10.499Z"),
		"notificationDate": new Date(),
		"notificationSent": false,
		"marksAwarded": false,
		"tcCompleted": false,
		"skippedThisQuarter": false,
		"uuid": "d34deb1d-5fdf-4283-9afd-56d027ce2ba6"
	}
)

//
db.cmStatusLog.insert(
	{
		"tcUserName": "TC920028",
		"status": "Submitted By TC",
		"year": 2020,
		"dateCreated": ISODate("2020-03-12T09:11:56.387Z"),
		"lastUpdated": ISODate("2020-04-17T04:52:59.197Z"),
		"quarterNumber": 1,
		"paymentDate": ISODate("2020-03-12T09:11:56.387Z"),
		"quarterEndDate": ISODate("2020-06-12T09:11:56.387Z"),
		"notificationDate": ISODate("2020-04-17T09:11:56.387Z"),
		"notificationSent": true,
		"marksAwarded": false,
		"tcCompleted": false,
		"skippedThisQuarter": false,
		"commonStandardWhatToUpload": {
			"reception": true,
			"maleWashroom": true,
			"firstAidBox": true
		},
		"gradingParameterWhatToUpload": {
			"frontView": true,
			"lift": true
		},
		"jobRoleSpecificStandardWhatToUpload": {
			"qp": "AMH/Q1201",
			"laboratory": "HYBRID_1",
			"classRoom": "CLASS_1",
			"equipment": "empty",
		},
		"notificationTime": ISODate("2020-05-28T04:52:59.197Z")
	}
)

db.cmStatusLog.update(
	{
		"tcUserName": "TC105867",
		"quarterNumber": 1,
	},
	{
		$set: {
			"notificationTime": ISODate("2020-08-18T00:00:00Z"),
		}
	}
)

db.cmStatusLog.updateMany(
	{
		"quarterNumber": 1,
	},
	{
		$set: {
			"notificationTime": ISODate("2020-08-19T00:00:00Z"),
		}
	}
)

db.cmStatusLog.update(
	{
		"tcUserName": "TC1500455",
		"quarterNumber": 1,
	},
	{
		$set: {
			"tcCompleted": true,
			"marksAwarded": true,
		}
	}
)

db.cmStatusLog.find({ "tcUserName": "TC300038" })



db.cmStatusLog.insert(
	{
		"tcUserName": "TC300046",
		"year": 2020,
		"dateCreated": ISODate("2020-04-29T09:57:10.499Z"),
		"lastUpdated": ISODate("2020-04-29T09:57:10.499Z"),
		"quarterNumber": 4,
		"paymentDate": ISODate("2020-04-29T09:57:10.499Z"),
		"quarterEndDate": ISODate("2020-07-29T09:57:10.499Z"),
		"notificationDate": ISODate("2020-05-05T00:00:00.000Z"),
		"notificationSent": false,
		"marksAwarded": false,
		"tcCompleted": false,
		"skippedThisQuarter": false,
		"uuid": "d34deb1d-5fdf-4283-9afd-56d027ce2ba6"
	}
)
//
[
	"Educational Institute/ Any other Building",
	"Industrial/Commercial Building",
	"Stand Alone Building"
]


db.cmStatusLog.updateMany({},
	{
		$set: {
			"notificationSent": true,
			"tcCompleted": true,
			"marksAwarded": true,
		}
	}
)

db.cmStatusLog.remove({})
db.tccontinuousmonitoring.remove({})
db.cmworkflow.remove({})
db.trainingcentre.updateMany({ "userName": { "$in": ["TC100113", "TC100151", "TC005139", "TC059057", "TC059240"] } },
	{ $set: { "spoc.mobileNumber": NumberLong("9490285247"), "spoc.email": "tharun.d@transneuron.com" } })
db.trainingpartner.updateMany({ "userName": { "$in": ["TP000137", "TP004020"] } },
	{ $set: { "spoc.mobileNumber": NumberLong("9490285247"), "spoc.email": "tharun.d@transneuron.com" } })
db.trainingcentre.find({ "continuousMonitoringPayment": "success" }).forEach(data => {
	paymentsData = db.payments.find({
		userId: data["userName"], "requestMetadata.subscriptionDetails.referenceType": "Continuous Monitoring Fee", "isComplete": true,
		"responseMetadata.trans_date": { "$exists": true },
	}).sort({ "_id": -1 }).limit(1).toArray()

	cmStatusLog = {}
	cmStatusLog["_id"] = new ObjectId()

	cmStatusLog["tcUserName"] = data["userName"]
	cmStatusLog["tpUserName"] = data["trainingPartner"]["userName"]
	cmStatusLog["year"] = 2020
	cmStatusLog["quarterNumber"] = 1
	cmStatusLog["paymentDate"] = paymentsData[0]["responseMetadata"]["trans_date"]
	cmStatusLog["notificationDate"] = ISODate("2020-07-23T00:00:00.000Z")
	var quarterEndDate = new Date(cmStatusLog["notificationDate"].getTime() + (90 * 24 * 60 * 60 * 1000))
	cmStatusLog["quarterEndDate"] = quarterEndDate
	cmStatusLog["notificationSent"] = false
	cmStatusLog["marksAwarded"] = false
	cmStatusLog["skippedThisQuarter"] = false
	cmStatusLog["tcCompleted"] = false

	db.cmStatusLog.insert(cmStatusLog)

})

db.tcworkflow.updateMany({ "assignedNextUserRole": "Inspection Agency" },
	{ "$set": { "assignedNextUser": "PIOOO6", "actionTakenBy": "PIOOO6" } })


db.users.remove({ "userName": "PI0007" })
db.inspectionagency.remove({ "userName": "PI0007" })

db.tcworkflow.find({ "assignedNextUserRole": "Inspection Agency" }).forEach(data => {
	tcData = db.trainingcentre.find({ "userName": data["tcId"] }).toArray()
	if (tcData.length != 0 && tcData[0]["address"]["zone"] == "IMAC") {
		data["assignedNextUser"] = "PI0006"
		data["actionTakenBy"] = "PI0006"
	} else if (tcData.length != 0 && tcData[0]["address"]["zone"] == "QACA") {
		data["assignedNextUser"] = "PQ0001"
		data["actionTakenBy"] = "PQ0001"
	}
	db.tcworkflow.save(data)
})

db.tcworkflow.updateMany({ "assignedNextUserRole": "PMKK SPOC" },
	{ "$set": { "assignedNextUser": "HARPREET.KAUR", "actionTakenBy": "HARPREET.KAUR" } })


states = ["HARYANA", "JHARKHAND", "CHHATTISGARH", "GUJARAT", "UTTAR PRADESH", "CHANDIGARH", "DELHI", "MADHYA PRADESH", "GOA", "RAJASTHAN", "PUNJAB"]
db.trainingcentre.find({ "address.state.name": { "$in": states }, "processType": "Accreditation & Affiliation", "continuousMonitoringPayment": "success" }).forEach(data => {
	paymentsData = db.payments.find({
		userId: data["userName"], "requestMetadata.subscriptionDetails.referenceType": "Continuous Monitoring Fee", "isComplete": true,
		"responseMetadata.trans_date": { "$exists": true },
	}).sort({ "_id": -1 }).limit(1).toArray()
	
	cmStatusLog = {}
	cmStatusLog["_id"] = new ObjectId()

	cmStatusLog["tcUserName"] = data["userName"]
	cmStatusLog["tpUserName"] = data["trainingPartner"]["userName"]
	cmStatusLog["year"] = 2020
	cmStatusLog["quarterNumber"] = 1
	if (paymentsData.length > 0) {
		cmStatusLog["paymentDate"] = paymentsData[0]["date"]
	}
	//cmStatusLog["notificationDate"] = ISODate("2020-07-23T00:00:00.000Z")
	cmStatusLog["notificationDate"] = new Date()
	var quarterEndDate = new Date(cmStatusLog["notificationDate"].getTime() + (90 * 24 * 60 * 60 * 1000))
	cmStatusLog["quarterEndDate"] = quarterEndDate
	cmStatusLog["notificationSent"] = false
	cmStatusLog["marksAwarded"] = false
	cmStatusLog["skippedThisQuarter"] = false
	cmStatusLog["tcCompleted"] = false

	db.cmStatusLog.insert(cmStatusLog)

})