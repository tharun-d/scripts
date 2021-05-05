db.trainingpartner.find({ userName: "TP060611" }).forEach(x => {
    //daReviews
    len = x["daReviews"].length
    print("previous daReviews: ", x["daReviews"][len - 1]["daReport"])
    x["daReviews"][len - 1]["daReport"] = x["daReport"]
    print("updated daReviews: ", x["daReport"])

    db.trainingpartner.save(x)
})


db.centreinspector.find({ "belongsTo": "akash1" }).forEach(data => {
    for (var i = 0; i < data["belongsTo"].length; i++) {
        if (data["belongsTo"][i] == "akash1") {
            data["belongsTo"][i] = "SCPWD"
            print(data["userName"])
        }
    }
    db.centreinspector.save(data)
})

db.qualitycontrol.find({ "belongsTo": "akash1" }).forEach(data => {
    for (var i = 0; i < data["belongsTo"].length; i++) {
        if (data["belongsTo"][i] == "akash1") {
            data["belongsTo"][i] = "SCPWD"
            print(data["userName"])
        }
    }
    db.qualitycontrol.save(data)
})

db.desktopassessor.find({ "belongsTo": "PI0006" }).forEach(data => {
    for (var i = 0; i < data["belongsTo"].length; i++) {
        if (data["belongsTo"][i] == "PI0006") {
            data["belongsTo"][i] = "IA_000001"
            print(data["userName"])
        }
    }
    db.desktopassessor.save(data)
})
db.tcworkflow.updateMany({ "assignedNextUser": "akash1" }, { "$set": { "assignedNextUser": "SCPWD" } })
db.tcworkflow.updateMany({ "actionTakenBy": "akash1" }, { "$set": { "actionTakenBy": "SCPWD" } })
db.users.remove({ userName: "akash1" })
db.ssc.remove({ userName: "akash1" })

db.trainingcentre.find({ status: { "$in": ["reRequest"] } }).forEach(data => {
    paymentsData = db.payments.find({ "requestMetadata.subscriptionDetails.referenceType": "CAAF Editing Fee", "isComplete": true, "userId": data["userName"] }).sort({ "date": -1 }).toArray()
    if (paymentsData.length > 0) {

        if (data["submittedOn"] < paymentsData[0]["date"]) {
            print("submittedOn: ", data["submittedOn"])
            print("date: ", paymentsData[0]["date"])
        }
    }

})

db.trainingcentre.find({ status: { "$in": ["paymentDoneForUpdateCaaf"] } }).forEach(data => {
    paymentsData = db.payments.find({ "requestMetadata.subscriptionDetails.referenceType": "CAAF Editing Fee", "isComplete": true, "userId": data["userName"] }).sort({ "date": -1 }).toArray()
    if (paymentsData.length > 0) {

        if (data["submittedOn"] > paymentsData[0]["date"]) {
            print("submittedOn: ", data["submittedOn"])
            print("date: ", paymentsData[0]["date"])
        }
    }

})

tcIds = [
    "TC013166",
    "TC040409",
    "TC040411",
    "TC040586",
    "TC040678",
    "TC040746",
    "TC046376",
    "TC056861",
    "TC056870",
    "TC057372",
    "TC057821",
    "TC060808",
    "TC105745",
    "TC107350",
    "TC128495",
    "TC128788"]

tcIds.forEach(data => {

    tcData = db.trainingcentre.findOne({ userName: data })
    dd = db.tcworkflow.find({ "tcId": data, "assignedNextUserRole": "Holding Agency", "migration": { "$exists": false }, "requestType": { "$exists": false } }).sort({ "actionTakenOn": -1 }).toArray()

    //print(tcData["trainingPartner"]["type"])
    //print(tcData["trainingCenterType"])
    if (dd.length > 0) {

        print(tcData["trainingCenterType"])

    }
})


tcIds = [
    "TC105745",
    "TC128495",
    "TC128788"
]

tcIds.forEach(data => {

    tcData = db.trainingcentre.findOne({ userName: data })
    dd = db.tcworkflow.find({ "tcId": data, "assignedNextUserRole": "Holding Agency", "migration": { "$exists": false }, "requestType": { "$exists": false } }).sort({ "actionTakenOn": -1 }).toArray()

    //print(tcData["trainingPartner"]["type"])
    //print(tcData["trainingCenterType"])
    if (dd.length > 0) {

        print("submittedOn: ", tcData["submittedOn"])
        print("date: ", dd[0]["createdOn"])

    }
})

db.trainingpartner.find({ isSmart: true, "daReviews.date": { $type: 2 } }).forEach(data => {

    for (var i = 0; i < data.daReviews.length; i++) {
        print(data["userName"])
        data.daReviews[i].date = new Date(data.daReviews[i].date)
    }
    db.trainingpartner.save(data)
})

db.trainingpartner.find({ isSmart: true, "redaDate": { $type: 2 } }).forEach(data => {

    data.redaDate = new Date(data.redaDate)
    db.trainingpartner.save(data)
})


db.tcworkflow.update({ "_id": ObjectId("5dc3d4ac1a1dae0436e48d4e"), "tcId": "TC102036" }, {
    "$set": {
        "assignedNextUserRole": "Inspection Agency",
        "assignedNextUser": "PQ0001",
        "otherInformation.centreinspection.proposeddate": ISODate("2019-11-13T00:00:00Z"),
        "otherInformation.centreinspection.ciuserName": "KULBHUSHAN.QACA",
        "otherInformation.centreinspection.qcuserName": "KARTIKEY_QACA_QC",
        "otherInformation.centreinspection.tcWorkflowID": "5dc3d4ac1a1dae0436e48d4e",
    }
})
db.trainingcentre.update({ userName: "TC030885" },
    { "$set": { "inspectionCenterDates.0.tcWorkflowID": "5dc3d4ac1a1dae0436e48d4e" } })


db.tcworkflow.update({ "_id": ObjectId("5dcd229940b4db041d31cfc3"), "tcId": "TC108125" }, {
    "$set": {
        "assignedNextUserRole": "Inspection Agency",
        "assignedNextUser": "PQ0001",
        "otherInformation.centreinspection.proposeddate": ISODate("2019-11-16T00:00:00Z"),
        "otherInformation.centreinspection.ciuserName": "CI_000001",
        "otherInformation.centreinspection.qcuserName": "KARTIKEY_QACA_QC",
        "otherInformation.centreinspection.tcWorkflowID": "5dcd229940b4db041d31cfc3",
    }
})


tcIds = [
    "TC129639",
    "TC127005",
    "TC126304",
    "TC124183",
    "TC122531",
    "TC121348",
    "TC119604",
    "TC116534",
    "TC116531",
    "TC116090",
    "TC113699",
    "TC113678",
    "TC112875",
    "TC112232",
    "TC111402",
    "TC111399",
    "TC111391",
    "TC110650",
    "TC109844",
    "TC109660",
    "TC109068",
    "TC108152",
    "TC107641",
    "TC107373",
    "TC107002",
    "TC106938",
    "TC105265",
    "TC104999",
    "TC104431",
    "TC104206",
    "TC045127",
    "TC061974",
    "TC048769",
    "TC001024",
    "TC049352",
    "TC058397",
    "TC053204",
    "TC048583",
    "TC060515",
    "TC060773",
    "TC049706",
    "TC057493",
    "TC040449",
    "TC038298",
    "TC058256",
    "TC040822",
    "TC060641",
    "TC051915",
    "TC054892",
    "TC050531",
    "TC018617",
    "TC060190",
    "TC054792",
    "TC060184",
    "TC060369",
    "TC056616",
    "TC040830",
    "TC041298",
    "TC060550",
    "TC058816",
    "TC044994",
    "TC060793",
    "TC057285",
    "TC056513",
    "TC035746",
    "TC054800",
    "TC031524",
    "TC042235",
    "TC058497",
    "TC059282",
    "TC041271",
    "TC053753",
    "TC045385",
    "TC042174",
    "TC048839",
    "TC044148",
    "TC040964",
    "TC062515",
    "TC063123",
    "TC059513",
    "TC045399",
    "TC038943",
    "TC052781",
    "TC041221",
    "TC059586",
    "TC060663",
    "TC044213",
    "TC037835",
    "TC037837",
    "TC044877",
    "TC045990",
    "TC059352",
    "TC000455",
    "TC041199",
    "TC050572",
    "TC058696",
    "TC059992",
    "TC013312",
    "TC000029",
    "TC061802",
    "TC051169",
    "TC051224",
    "TC038578",
    "TC040930",
    "TC028482",
    "TC041917",
    "TC054552",
    "TC054610",
    "TC059765",
    "TC041870",
    "TC030181",
    "TC049287",
    "TC060260",
    "TC062530",
    "TC057412",
    "TC043468",
    "TC060119",
    "TC014154",
    "TC055738",
    "TC041052",
    "TC054326",
    "TC000750",
    "TC003261",
    "TC059636",
    "TC055910",
    "TC035026",
    "TC054194",
    "TC028232",
    "TC016069",
    "TC018944",
    "TC023730",
    "TC019605",
    "TC033776",
    "TC028280",
    "TC001402",
    "TC002964",
    "TC042323",
    "TC043460",
    "TC054003",
    "TC041005",
    "TC040814",
    "TC052330",
    "TC059499",
    "TC044678",
    "TC060693",
    "TC040756",
    "TC048274",
    "TC060076",
    "TC062218",
    "TC056452",
    "TC013352",
    "TC057884",
    "TC046290",
    "TC040107",
    "TC051595",
    "TC040624",
    "TC011081",
    "TC004621",
    "TC056438",
    "TC009670",
    "TC032932",
    "TC003009",
    "TC053860",
    "TC002603",
    "TC053874",
    "TC058707",
    "TC004970",
    "TC061236",
    "TC060750",
    "TC049382",
    "TC058151",
    "TC049708",
    "TC028030",
    "TC004347",
    "TC031022",
    "TC050457",
    "TC062378",
    "TC062450",
    "TC058065",
    "TC058141",
    "TC055817",
    "TC044685",
    "TC020114",
    "TC018568",
    "TC061915",
    "TC047245",
    "TC044363",
    "TC055295",
    "TC047464",
    "TC047748",
    "TC058278",
    "TC040573",
    "TC058284",
    "TC012998",
    "TC052895",
    "TC047146",
    "TC041097",
    "TC041276",
    "TC040804",
    "TC019621",
    "TC006925",
    "TC040347",
    "TC012128",
    "TC039836",
    "TC007146",
    "TC018604",
    "TC026546",
    "TC025171",
    "TC025566",
    "TC005966",
    "TC022749",
    "TC010466",
    "TC012924",
    "TC030260",
    "TC040353",
    "TC019713",
    "TC009001",
    "TC028248",
    "TC012003",
    "TC008141",
    "TC031082",
    "TC007723",
    "TC036736",
    "TC018610",
    "TC033274",
    "TC005038",
    "TC015419",
    "TC020109",
    "TC005859",
    "TC007354",
    "TC001987",
    "TC015202",
    "TC002855",
    "TC004234",
    "TC007050",
    "TC007973",
    "TC001094",
    "TC002954",
    "TC003904",
    "TC000404",
    "TC002792",
    "TC001890"]

tcIds.forEach(data => {

    db.trainingcentre.find({ "userName": data }).forEach(tcData => {
        if (tcData["status"] == "paymentDoneForUpdateCaaf" || tcData["status"] == "appliedForUpdateCaaf") {
            tcData["status"] = "Rejected"

            db.trainingcentre.save(tcData)

        } else {
            print(data, tcData["status"])
        }
    })
})

tcIds = [
    "TC110602",
    "TC112377",
    "TC112555",
    "TC113327",
    "TC114365",
    "TC114778",
    "TC115253",
    "TC115276",
    "TC115512",
    "TC115638",
    "TC115692",
    "TC115745",
    "TC115753",
    "TC115768",
    "TC115777",
    "TC115796",
    "TC115863",
    "TC115965",
    "TC116009",
    "TC116033",
    "TC116035",
    "TC116074",
    "TC116085",
    "TC116111",
    "TC116141",
    "TC116270",
    "TC116287",
    "TC116316",
    "TC116401",
    "TC116418",
    "TC116461",
    "TC116464",
    "TC116527",
    "TC116539",
    "TC116541",
    "TC116556",
    "TC116562",
    "TC116647",
    "TC116715",
    "TC116731",
    "TC116851",
    "TC116902",
    "TC116918",
    "TC116935",
    "TC116944",
    "TC116990",
    "TC116997",
    "TC117005",
    "TC117057",
    "TC117068",
    "TC117118",
    "TC117198",
    "TC117208",
    "TC117209",
    "TC117288",
    "TC117353",
    "TC117361",
    "TC117370",
    "TC117405",
    "TC117440",
    "TC117443",
    "TC117463",
    "TC117472",
    "TC117473",
    "TC117528",
    "TC117541",
    "TC117557",
    "TC117561",
    "TC117633",
    "TC117650",
    "TC117737",
    "TC117745",
    "TC117757",
    "TC117837",
    "TC117840",
    "TC117886",
    "TC117898",
    "TC117936",
    "TC117964",
    "TC117975",
    "TC117979",
    "TC118028",
    "TC118048",
    "TC118062",
    "TC118159",
    "TC118205",
    "TC118232",
    "TC118299",
    "TC118323",
    "TC118331",
    "TC118463",
    "TC118482",
    "TC118514",
    "TC118520",
    "TC118524",
    "TC118526",
    "TC118529",
    "TC118622",
    "TC118637",
    "TC118639",
    "TC118655",
    "TC118705",
    "TC118773",
    "TC118795",
    "TC118821",
    "TC118887",
    "TC118944",
    "TC118969",
    "TC118997",
    "TC119004",
    "TC119023",
    "TC119080",
    "TC119082",
    "TC119093",
    "TC119098",
    "TC119131",
    "TC119140",
    "TC119174",
    "TC119175",
    "TC119179",
    "TC119186",
    "TC119247",
    "TC119291",
    "TC119391",
    "TC119400",
    "TC119403",
    "TC119406",
    "TC119407",
    "TC119410",
    "TC119422",
    "TC119425",
    "TC119463",
    "TC119487",
    "TC119500",
    "TC119555",
    "TC119648",
    "TC119654",
    "TC119712",
    "TC119775",
    "TC119783",
    "TC119822",
    "TC119855",
    "TC119912",
    "TC120028",
    "TC120053",
    "TC120120",
    "TC120129",
    "TC120142",
    "TC120190",
    "TC120192",
    "TC120223",
    "TC120234",
    "TC120288",
    "TC120307",
    "TC120384",
    "TC120394",
    "TC120411",
    "TC120412",
    "TC120430",
    "TC120447",
    "TC120570",
    "TC120591",
    "TC120600",
    "TC120611",
    "TC120730",
    "TC120788",
    "TC120819",
    "TC120826",
    "TC120837",
    "TC120844",
    "TC120860",
    "TC120878",
    "TC120881",
    "TC120902",
    "TC120939",
    "TC120957",
    "TC120975",
    "TC121001",
    "TC121002",
    "TC121014",
    "TC121022",
    "TC121023",
    "TC121031",
    "TC121038",
    "TC121064",
    "TC121104",
    "TC121114",
    "TC121147",
    "TC121149",
    "TC121211",
    "TC121234",
    "TC121238",
    "TC121241",
    "TC121273",
    "TC121291",
    "TC121366",
    "TC121368",
    "TC121373",
    "TC121419",
    "TC121435",
    "TC121439",
    "TC121474",
    "TC121475",
    "TC121569",
    "TC121599",
    "TC121687",
    "TC121842",
    "TC121914",
    "TC121964",
    "TC122024",
    "TC122027",
    "TC122029",
    "TC122038",
    "TC122106",
    "TC122187",
    "TC122578",
    "TC122613",
    "TC122629",
    "TC122633",
    "TC122636",
    "TC122645",
    "TC122648",
    "TC122678",
    "TC122735",
    "TC122828",
    "TC122855",
    "TC122871",
    "TC122872",
    "TC122913",
    "TC123025",
    "TC123027",
    "TC123028",
    "TC123031",
    "TC123056",
    "TC123080",
    "TC123086",
    "TC123116",
    "TC123165",
    "TC123238",
    "TC123259",
    "TC123261",
    "TC123299",
    "TC123314",
    "TC123333",
    "TC123338",
    "TC123353",
    "TC123392",
    "TC123490",
    "TC123503",
    "TC123518",
    "TC123524",
    "TC123534",
    "TC123559",
    "TC123578",
    "TC123645",
    "TC123713",
    "TC123756",
    "TC123766",
    "TC123795",
    "TC123928",
    "TC123978",
    "TC123987",
    "TC124064",
    "TC124081",
    "TC124093",
    "TC124149",
    "TC124160",
    "TC124252",
    "TC124312",
    "TC124360",
    "TC124429",
    "TC124489",
    "TC124506",
    "TC124507",
    "TC124510",
    "TC124511",
    "TC124521",
    "TC124599",
    "TC124604",
    "TC124607",
    "TC124608",
    "TC124616",
    "TC124625",
    "TC124632",
    "TC124653",
    "TC124675",
    "TC124682",
    "TC124727",
    "TC124755",
    "TC124761",
    "TC124772",
    "TC124773",
    "TC124810",
    "TC124815",
    "TC124824",
    "TC124895",
    "TC124949",
    "TC124987",
    "TC125011",
    "TC125035",
    "TC125046",
    "TC125049",
    "TC125052",
    "TC125053",
    "TC125108",
    "TC125131",
    "TC125171",
    "TC125270",
    "TC125296",
    "TC125448",
    "TC125451",
    "TC125611",
    "TC125665",
    "TC125704",
    "TC125774",
    "TC125785",
    "TC125862",
    "TC125955",
    "TC125987",
    "TC126000",
    "TC126014",
    "TC126064",
    "TC126113",
    "TC126144",
    "TC126246",
    "TC126302",
    "TC126321",
    "TC126398",
    "TC126478",
    "TC126570",
    "TC126763",
    "TC126764",
    "TC126809",
    "TC126885",
    "TC126895",
    "TC126926",
    "TC127052",
    "TC127344",
    "TC127371",
    "TC127408",
    "TC127528",
    "TC127589",
    "TC127818",
    "TC127833",
    "TC127834",
    "TC127889",
    "TC127935",
    "TC127983",
    "TC128006",
    "TC128076",
    "TC128078",
    "TC128090",
    "TC128092",
    "TC128116",
    "TC128148",
    "TC128152",
    "TC128160",
    "TC128164",
    "TC128165",
    "TC128169",
    "TC128234",
    "TC128266",
    "TC128286",
    "TC128288",
    "TC128309",
    "TC128311",
    "TC128331",
    "TC128365",
    "TC128399",
    "TC128403",
    "TC128414",
    "TC128426",
    "TC128429",
    "TC128451",
    "TC128588",
    "TC128596",
    "TC128612",
    "TC128780",
    "TC128795",
    "TC128805",
    "TC128844",
    "TC128941",
    "TC129244",
    "TC129284",
    "TC129311",
    "TC130194",
    "TC130802",
]
tcIds.forEach(data => {

    count = db.tcworkflow.find({
        "tcId": data,
        "status": "Approved",
        "requestType": { "$in": ["Aebas Request"] },
    }).count()
    if (count > 0) {
        print("Approved")
    } else {
        print("Not Approved")

    }
})

db.ssc.updateMany({},
    { "$set": { "email": "atu.upadhaya@nsdcindia.org" } })

db.trainingcentre.updateMany({ "userName": { "$in": ["TC104517", "TC105311", "TC105956"] } },
    { $set: { "spoc.mobileNumber": NumberLong("7827286018"), "spoc.email": "atu.upadhaya@nsdcindia.org" } })

db.inspectionagency.updateMany({},
    { "$set": { "email": "atu.upadhaya@nsdcindia.org" } })


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

db.smartTempTOT.find({}).forEach(dr => {
    db.trainingcentre.find({ "userName": dr["TC Id"], "processType": "Accreditation & Affiliation", "jobRoles": { "$exists": true } }).forEach(tcData => {
        var finalData = {}
        finalData["tcId"] = tcData["userName"]

        for (var i = 0; i < tcData["jobRoles"].length; i++) {
            if (tcData["jobRoles"][i]["qp"] == dr["QP Code"]) {
                finalData["qpCode"] = tcData["jobRoles"][i]["qp"]
                if (tcData["jobRoles"][i]["associatedTrainer"]) {
                    for (var j = 0; j < tcData["jobRoles"][i]["associatedTrainer"].length; j++) {

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
                        db.smartFinalDataTOT.insert(finalData)

                    }
                }

            }
        }
    })
})

count = 0
db.ssc.find({ type: "SMART" }).forEach(data => {
    loginhistory = db.loginhistory.find({ "username": data["userName"] }).sort({ "_id": -1 }).toArray()
    var finalData = {}
    if (loginhistory.length > 0) {
        finalData["_id"] = new ObjectId()
        finalData["userName"] = data["userName"]
        finalData["sector"] = data["sector"]["name"]
        finalData["email"] = data["email"]
        finalData["loginTime"] = loginhistory[0]["loginTime"]
        count = count + 1
        print(count)
        db.loginData.save(finalData)

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
                            finalData["tcId"] = tcData["userName"]
                            finalData["tcId"] = tcData["userName"]
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
                            // db.smartTempTOT.insert(finalData)
                        }
                    }
                }
            }
        }
    }
})
//mongoexport -d ekaushalnsdc -c smartTempTOT --type=csv --fields tcId,jobRoleName,qpCode,trainerId,totCertified,NIESBURD,Aebas -o smartTempTOT.csv

tcIds = [
    "TC010658",
    "TC048036",
    "TC046234",
    "TC028293",
    "TC044679",
    "TC046294",
    "TC046264",
    "TC012275",
    "TC046451",
    "TC117697",
]
tcIds.forEach(data => {
    db.trainingcentre.find({ userName: data }).forEach(tcData => {

        print(tcData["status"])
        print(tcData["financeSpocStatusForApplicationWithdrawl"])
        db.trainingcentre.save(tcData)
    })
})

commonMobile = 0
canBeResolved = 0
db.trainingcentre.aggregate([
    { "$match": { "processType": "Accreditation & Affiliation" } },
    { "$group": { _id: "$spoc.mobileNumber", userName: { "$push": "$userName" }, myCount: { $sum: 1 } } },
    { "$match": { "myCount": { "$gt": 1 } } },
    { "$project": { _id: 0, userName: "$userName" } },
]).forEach(data => {
    commonMobile = commonMobile + 1
    c = db.users.distinct("phone.mobile", { "userName": { "$in": data["userName"] } })
    if (c.length == data["userName"].length) {
        canBeResolved = canBeResolved + c.length
    }
})
print(commonMobile)
print(canBeResolved)

commonMobile = 0
canBeResolved = 0
db.trainingcentre.aggregate([
    { "$match": { "processType": "Accreditation & Affiliation" } },
    { "$group": { _id: "$spoc.email", userName: { "$push": "$userName" }, myCount: { $sum: 1 } } },
    { "$match": { "myCount": { "$gt": 1 } } },
    { "$project": { _id: 0, userName: "$userName" } },
]).forEach(data => {
    commonMobile = commonMobile + 1
    c = db.users.distinct("email", { "userName": { "$in": data["userName"] } })
    if (c.length == data["userName"].length) {
        canBeResolved = canBeResolved + c.length
    }
})
print(commonMobile)
print(canBeResolved)

db.trainingpartner.find({ "generalDetailsOfTP.yearOfEstablishment": { "$type": 2 } }).forEach(x => {
    if (x['generalDetailsOfTP']['yearOfEstablishment'] && x['generalDetailsOfTP']['yearOfEstablishment'] != "") {
        x['generalDetailsOfTP']['yearOfEstablishment'] = Number(x['generalDetailsOfTP']['yearOfEstablishment'])
        db.trainingpartner.save(x)
    }
})

db.trainingcentre.update({ userName: "TC056749" }, {
    "$set": {
        "address.state": {
            "name": "MIZORAM",
            "id": 15
        },
        "address.district": {
            "name": "AIZAWL",
            "id": 261
        },
        "address.subDistrict": {
            "name": "AIZAWL"
        },
        "address.parliamentaryConstituency": {
            "name": "Mizoram"
        },
    }
})

db.trainingcentre.find({
    "jobRoles.status": "deaccrediated",
    "processType": "Accreditation & Affiliation"
}).forEach(y => {
    var dc = y.jobRoles.length

    var count = 0
    for (var i = 0; i < y.jobRoles.length; i++) {
        if (y.jobRoles[i] && y.jobRoles[i].status && y.jobRoles[i].sscStatus == "deaccrediated") {
            count = ++count
        }
    }
    if (count == dc) {
        y.status = "DEACCREDIATED"
        y.continuousMonitoringPayment = ""
        db.trainingcentre.save(y)
    }
})
db.cmworkflow.updateMany({ assignedNextUser: "IMaCS_Inspector_0001" }, { "$set": { assignedNextUser: "PI0006" } })

data = [
    "TP000048",
    "TP000187",
    "TP000200",
    "TP000695",
    "TP000929",
    "TP001256",
    "TP001340",
    "TP001454",
    "TP003215",
    "TP003643",
    "TP006997",
    "TP008433",
    "TP008627",
    "TP008737",
    "TP008919",
    "TP008996",

]

data.forEach(x => {
    data = db.trainingpartner.findOne({ userName: x })
    print("tPId : ", x)
    print("oldType : ", data["generalDetailsOfTP"]["oldTypeOfOrganisation"])
    print("newType : ", data["generalDetailsOfTP"]["typeOfOrganisation"])
})

db.trainingcentre.update({ userName: "TC131708" },
    {
        "$set": {
            "ciGradingMatrixValues.1.gradingMatrixValues.powerBackupScores": 3,
            "ciGradingMatrixValues.1.gradingMatrixScore": 28,
            "ciGradingMatrixValues.1.rating": 3,

            "gradingMatrixScore": 28,
            "gradingMatrixValues.powerBackupScores": 3,
            "rating": 3,
        }
    })

db.cmworkflow.updateMany({ assignedNextUser: "IMaCS_Inspector_0001" }, { "$set": { assignedNextUser: "PI0006" } })
////


data = db.qps.findOne({ "qpCode": "HSS/Q5102", version: "2.0" }, { eqptDetails: 1 })
eqptDetails = data["eqptDetails"]
print(eqptDetails.length)

var finalEqpData = []
db.trainingcentre.find({ userName: "TC143254" }).forEach(x => {
    for (let i = 0; i < x["jobRoles"].length; i++) {
        for (let j = 0; j < x["jobRoles"][i]["equipemnts"].length; j++) {
            for (let k = 0; k < eqptDetails.length; k++) {
                if (eqptDetails[k]["status"] == "Active") {
                    if (eqptDetails[k]["eqptName"] == x["jobRoles"][i]["equipemnts"][j]["eqptName"]) {
                        finalEqpData.push(x["jobRoles"][i]["equipemnts"][j])
                        continue
                    }
                }

            }
        }
    }
    print(finalEqpData.length)
})

count = 0
for (let k = 0; k < eqptDetails.length; k++) {
    if (eqptDetails[k]["status"] == "Active") {
        notFound = true
        for (let i = 0; i < finalEqpData.length; i++) {
            if (eqptDetails[k]["eqptName"] == finalEqpData[i]["eqptName"]) {
                notFound = false
            }
        }
        if (notFound) {
            count = count + 1
            var obj = {}
            obj["eqptName"] = eqptDetails[k]["eqptName"]
            obj["minQtyReq"] = eqptDetails[k]["minEquipReq"]["for30Trainees"]
            obj["mandatoryEqptAvailableToTC"] = "Yes"
            obj["availabilityQuantity"] = eqptDetails[k]["minEquipReq"]["for30Trainees"]
            obj["ciAavailabilityQuantity"] = eqptDetails[k]["minEquipReq"]["for30Trainees"]
            obj["tccompleted"] = true
            finalEqpData.push(finalEqpData, obj)
        }
    }
}
print(count)
print("finalEqpData.length :  ", finalEqpData.length)


//db.trainingcentre.update({ userName: "TC143254" }, { "$set": { "jobRoles.$[].equipemnts": finalEqpData } })

db.trainingcentre.find({userName: "TC143254" }).forEach(x=> {

    for (let index = 0; index < x["jobRoles"].length; index++) {
        for (let k = 0; k < finalEqpData.length; k++){
            //printjson(finalEqpData[k])
            x["jobRoles"][index]["equipemnts"].push(x["jobRoles"][index]["equipemnts"], finalEqpData[k])
        }
    }
    db.trainingcentre.save(x)
})