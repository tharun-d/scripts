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
db.trainingcentre.updateMany({ "userName": { "$in": ["TC104517"] } },
	{ $set: { "spoc.mobileNumber": NumberLong("7827286018"), "spoc.email": "mahesh.k@transneuron.com" } })
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

db.cmStatusLog.remove({})
db.tccontinuousmonitoring.remove({})
db.cmworkflow.remove({})
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

data = db.communication_service_email_details.distinct("requestDetails.body.to",
	{
		"lastModifiedDate":
			{ "$gte": ISODate("2020-08-19T11:52:35.540Z"), "$lte": ISODate("2020-08-19T13:52:35.540Z") }
	})
print(data.length)


data = [
	"info@softdoteducation.com",
	"ivyindiaprojects@gmail.com",
	"kvsnarayana@atriapower.com",
	"director.skill@bajiyasecurity.com",
	"teamnsdc@eherex.com",
	"mis.nsdc@qacamail.com",
	"ed@f-tec.net.in",
	"info@vidyaweb.in",
	"rupalikapahi8@gmail.com",
	"NIRAJ@MEDHAVIFOUNDATION.ORG",
	"neetika23b@gmail.com",
	"mis@empowerpragati.in",
	"rbvs.pmkvy@gmail.com",
	"ascrsldc@gmail.com",
	"bijnor.pmkvy@gmail.com",
	"sjgvsjharkhand@gmail.com",
	"utthaanindia1@gmail.com",
	"amit@saf.org.in",
	"ashish.verma@doricmultimedia.com",
	"mksricha@gmail.com",
	"operations.shrivinayak@gmail.com",
	"abhishek.singh@ilfsindia.com",
	"shriramskillsdevelopment@gmail.com",
	"mantra.pmkvy@gmail.com",
	"micronet.nisha91@gmail.com",
	"neelesh.awasthi81@gmail.com",
	"gbwt.tundla@gmail.com",
	"ved.pandey@scott.net.in",
	"skill@softdottech.com",
	"projects@bciindia.in",
	"sanjaykalkal@gmail.com",
	"navbharti.itgk@gmail.com",
	"skjain579@gmail.com",
	"parantapcnc@yahoo.co.in",
	"neeraj@microtek.ac.in",
	"SINGAL.VICKY@GMAIL.COM",
	"SKILLINDIAINFOTECH@GMAIL.COM",
	"msesindia@gmail.com",
	"rpjtech@rediffmail.com",
	"jkskillspl@gmail.com",
	"ospsgwalior2006@gmail.com",
	"svitskilleducation@gmail.com",
	"skumar19jan@gmail.com",
	"rizwan.futureshape@gmail.com",
	"mehwash.siddiqui@centumlearning.com",
	"sanjeevgupta@aisect.org",
	"masterminditc@gmail.com",
	"pmkk@Exceluslearning.com",
	"parminder.mansa@gmail.com",
	"neeteshkr.chourasia@icagroup.in",
	"grd.es@outlook.com",
	"mohitjain@dtieducation.com",
	"operations@mahendraskills.org",
	"accedetrading@gmail.com",
	"registrar@himalayaninstitutions.com",
	"er.pankajnain@gmail.com",
	"neeleshtiwari91@gmail.com",
	"somnathacharya@orionedutech.com",
	"englishamity@gmail.com",
	"idaksha.ajay@gmail.com",
	"DGNSKILL@GMAIL.COM",
	"parakhbisen@gmail.com",
	"gaurav@holbiz.in",
	"pawangyanvigyansansthan@gmail.com",
	"varunesh26@gmail.com",
	"operations@brmsociety.org",
	"mahendersharma346@gmail.com",
	"arikgrover91@gmail.com",
	"kishore@datapro.in",
	"lalit.poonia@gmail.com",
	"miplpmkvy@gmail.com",
	"sanjayy155@gmail.com",
	"deep@aitmc.in",
	"acplskills@gmail.com",
	"hemantchinnu@gmail.com",
	"rahul.rai@adsskill.com",
	"shashipandey466@gmail.com",
	"info.gangashomes@gmail.com",
	"dticomputer2009@gmail.com",
	"surabhiskills@gmail.com",
	"ypkhubbar@gmail.com",
	"ovelinfotech@yahoo.co.in",
	"council.esdt@gmail.com",
	"oliveheritage@gmail.com",
	"baromatrixfitnesspvtltd@gmail.com",
	"sonia.march@gmail.com",
	"rhombasinfo@gmail.com",
	"Mti_sln@yahoo.in",
	"nakul0810@gmail.com",
	"sadbhavnakaushalvikasdhadhar@gmail.com",
	"mkvsmahwa@gmail.com",
	"rakeshjangir@gmail.com",
	"pmkvyalwar1@gmail.com",
	"gajera.kaushik@gmail.com",
	"skillmoradabad@gmail.com",
	"lalitmegh@gmail.com",
	"pmkvychirana@gmail.com",
	"mradul44@gmail.com",
	"svti.pmkvy2.0@gmail.com",
	"anushka.sews@gmail.com",
	"slchoudhary1960@gmail.com",
	"pmkvyait@gmail.com",
	"directorsatyaskilledu@gmail.com",
	"rs9050777799@gmail.com",
	"pmkvybhartmata@gmail.com",
	"pmkvybagora@gmail.com",
	"rajendrasewdalosal@gmail.com",
	"stellaredgensdc@gmail.com",
	"aryancomputer02@gmail.com",
	"sharmasurabhi87@yahoo.com",
	"adftcbhukarka@gmail.com",
	"risingyouth.pmkvy@gmail.com",
	"ak.pk590@gmail.com",
	"jaisaisewasamiti987@gmail.com",
	"MANILNAIN@GMAIL.COM",
	"akhil.bahl@aaditsystems.com",
	"jkacademy21@gmail.com",
	"pmskillcentre@gmail.com",
	"itarunchugh@gmail.com",
	"SKILLYNR@GMAIL.COM",
	"smlovey09@gmail.com",
	"ramdevbagriya@gmail.com",
	"bhuvan.jbp@gmail.com",
	"mohit.p@jobsacademy.co.in",
	"mimtcollege@gmail.com",
	"sstialsisar@gmail.com",
	"jasbirkaur20009@gmail.com",
	"pmkk@ashpraskills.com",
	"skilldevelopment@ssrdp.org",
	"info@myskillsindia.com",
	"bluestarcomputers.in@gmail.com",
	"IQRAHYTECH@GMAIL.COM",
	"sahilmangla23@gmail.com",
	"mdiqra21@gmail.com",
	"shapingcareers@yahoo.com",
	"rajjab.ali@dishamail.com",
	"sganjiwale@calance.com",
	"mdshakir.jgi@GMAIL.COM",
	"akashshroti@gmail.com",
	"project.mgr@cews.in",
	"9ITECH.ONLINE@GMAIL.COM",
	"mdrgcpm@gmail.com",
	"dlicpvt@gmail.com",
	"harishtrivedi39@yahoo.com",
	"sspeducation.saksham@gmail.com",
	"dwe.nsdc@gmail.com",
	"spacecomputer2011@gmail.com",
	"gurunanakctc@gmail.com",
	"cdacbodeli@gmail.com",
	"aiirosindia1234@gmail.com",
	"pmkvy@sebiz.net",
	"raj@keystonegroup.in",
	"shrisai.head@gmail.com",
	"mrinal.bitm@gmail.com",
	"shrikanhasevasamati111@gmail.com",
	"uma_8232@yahoo.co.in",
	"rp964963@gmail.com",
	"arbindmishra@sutlejtextiles.com",
	"PRATHYAKSERVICES@GMAIL.COM",
	"vijayatul2008@gmail.com",
	"jangbirrana@gmail.com",
	"dseducationalcenter@gmail.com",
	"NARESHGAHLAWAT79@GMAIL.COM",
	"ckpdostt@hotmail.com",
	"infomgcpm@gmail.com",
	"nayasaverably@gmail.com",
	"mgiindia60@gmail.com",
	"sirworld@rediffmail.com",
	"director@ssvskills.in",
	"vksethibre@gmail.com",
	"ckrdrsldc@gmail.com",
	"director@rgeglobal.com",
	"sunretail.skill@gmail.com",
	"rcs1901@gmail.com",
	"saurya.upsdm@gmail.com",
	"mail@corvustech.in",
	"INFO@SKYLARK.IND.IN",
	"mukeshdablu@gmail.com",
	"Smilepmkvydelhi@gmail.com",
	"unizonahealthcare@gmail.com",
	"gautambudh.pmkvy2019@gmail.com",
	"delhi.skill@gmail.com",
	"fccmzn@rediffmail.com",
	"mailcletus@aol.com",
	"bhutto.javedkhan@marudhar.ac.in",
	"dayanand.singh@zyduscadila.com",
	"ritepwl@gmail.com",
	"avp.bd@shalby.org",
	"digitalsakshartasansthan@gmail.com",
	"sumit01.global@gmail.com",
	"saurabhnbnf@gmail.com",
	"shreesh.lko@gmail.com",
	"bcs.pmkvy@gmail.com",
	"pnes.delhi@yahoo.com",
	"shubham.pratt@socet.edu.in",
	"rajesh.arya@jalindia.co.in",
	"spoc.priteesamiti@gmail.com",
	"SROLA@JETAVIATION.CO.IN",
	"jagrutimpbirlagroup@gmail.com",
	"yogesh.thakur@vlccwellness.com",
	"soamsachdeva@sachdevacollege.com",
	"smpl.training@thesagar.in",
	"manoj.hanumat1984@gmail.com",
	"sandeepbela@gmail.com",
	"pro.pmkvy@aimetr.com",
	"vigyanjyoti.skilldevelopment@gmail.com",
	"harpreet@iqst.xyz",
	"prnsyadav25@gmail.com",
	"RAJDEEP.PARTNER@GMAIL.COM",
	"sanskruti99@yahoo.in",
	"bs_bath@hotmail.com",
	"roopal.singh@meghavin.com",
	"nkj81@rediffmail.com",
	"vigyansingh@rsecurity.in",
	"bjpsankhali17@gmail.com",
	"ivshmh@gmail.com",
	"deepak@jimsindia.org",
	"lbstc.jeetendra@gmail.com",
	"BDM@GCSGROUP.CO.IN",
	"monapandey@iihert.org",
	"jainskillspoc@gmail.com",
	"ayushshukla@itsltd.in",
	"parshav.nsdc@gmail.com",
	"shaurya@aegisskills.com",
	"saraswati1.saraswati@gmail.com",
	"iccfa011@gmail.com",
	"shapeindore@gmail.com",
	"ipec.trust@gmail.com",
	"gurkul.sagar@gmail.com",
	"rimcskath@gmail.com",
	"s.rajeshftp@gmail.com",
	"subhashkapoor@assocom-india.com",
	"sbhcshiningskills@gmail.com",
	"bdmashok@gmail.com",
	"aanand@pipaltreeventures.com",
	"spnayyar1@gmail.com",
	"cecsdelhi@gmail.com",
	"jkss.jnp@gmail.com",
	"pooja.agarwal@pratap.co.in",
	"sotsskill@gmail.com",
	"gdcollegebhuna@gmail.com",
	"adityaola08@gmail.com",
	"santmahavirjain2014@gmail.com",
	"skillindia@atm.edu.in",
	"psaranvir@yahoo.com",
	"swamiambrish@rediffmail.com",
	"meenaharisingh.01@gmail.com",
	"jitmskillspvtltd@gmail.com",
	"sksingh2909@gmail.com",
	"rahul.sarvasiddhanta@gmail.com",
	"citmjaipur@rtu.ac.in",
	"naresh161972@gmail.com",
	"ictelko@gmail.com",
	"deepthinj@hlfppt.org",
	"ajeet.singh@margcompusoft.com",
	"dinesh@svgjpr.com",
	"udaseenashram123@gmail.com",
	"nictindiabhuj@gmail.com",
	"ambicango@gmail.com",
	"priyanka.nandwani1@gmail.com",
	"ajeet178@gmail.com",
	"communications@amigossolutions.com",
	"starsecutech@gmail.com",
	"gravess2001@gmail.com",
	"manojtmr1@gmail.com",
	"bhagwatiskillgzb@gmail.com",
	"subhashchoudhary05@gmail.com",
	"ajitlakra@superfineknitters.com",
	"vkmd68@gmail.com",
	"sarvaskillindia@gmail.com",
	"rahul.goyal@bindalmill.com",
	"lekhrajsinghshikshasamiti@gmail.com",
	"nshrdrajasthan@gmail.com",
	"icsnursing7@gmail.com",
	"xine.operations@gmail.com",
	"vin144sh@gmail.com",
	"Karmatandfoundation2019@gmail.com",
	"lalitnarayan1412@gmail.com",
	"obborealtors@gmail.com",
	"eupraxisexpert@gmail.com",
	"i3infotech.skill@gmail.com",
	"CAINDIA1@gmail.com",
	"amarinternational9@gmail.com",
	"ceo.rerfindia@gmail.com"
]

data.forEach(x => {

	tpData = db.trainingpartner.findOne({ "spoc.email": x }, { userName: 1 })
	if (tpData && tpData["userName"]) {
		print(x)
	}
})


states = ["HARYANA", "JHARKHAND", "CHHATTISGARH", "GUJARAT", "UTTAR PRADESH", "CHANDIGARH", "DELHI", "MADHYA PRADESH", "GOA", "RAJASTHAN", "PUNJAB"]

db.trainingcentre.find({ "address.state.name": { "$in": states }, "processType": "Accreditation & Affiliation", "continuousMonitoringPayment": "success" }).sort({ "_id": -1 }).limit(100).forEach(data => {
	data["spoc"]["mobileNumber"] = NumberLong("9490285247")
	data["spoc"]["email"] = "tharun.d@transneuron.com"
	db.trainingcentre.save(data)
})

db.trainingcentre.find({ "address.state.name": { "$in": states }, "processType": "Accreditation & Affiliation", "continuousMonitoringPayment": "success" }).sort({ "_id": -1 }).skip(100).limit(100).forEach(data => {
	data["spoc"]["mobileNumber"] = NumberLong("949028524")
	data["spoc"]["email"] = "mahesh.k@transneuron.com"
	db.trainingcentre.save(data)
})