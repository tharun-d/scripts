count = 0
db.trainingpartner.find({ "isSmart": true, status: { "$nin": ["init", "paymentAwaiting", "Deactivated/blocked"] } }).forEach(data => {

    workflow = db.tpworkflow.find({ tpId: data["userName"], status: { "$in": ["DAAPPROVED", "DAREJECTED"] }, "toUsersRole": "Inspection Agency", "migration": { "$exists": false } }).sort({ "createdOn": -1 }).toArray()

    if (workflow.length > 0) {
        createdOn = workflow[0]["createdOn"]
        if (data["updatedOn"] > createdOn) {
            data["updatedOn"] = createdOn
            print("not migrated: ", data["userName"])
            print("not migrated: ", data["updatedOn"])
            count++
        }
    } else {// Migrated TP as no worlfkows there
        if (data["daReviews"].length > 0) {
            if (data["updatedOn"] > data["daReviews"][data["daReviews"].length - 1]["date"]) {
                data["updatedOn"] = data["daReviews"][data["daReviews"].length - 1]["date"]
                count++
                print("migrated: ", data["userName"])

            }
        }
    }
    //db.trainingpartner.save(data)
})

print(count)

count = 0
db.trainingpartner.find({ "isSmart": true, status: { "$nin": ["init", "paymentAwaiting", "Deactivated/blocked"] } }).forEach(data => {

    workflow = db.tpworkflow.find({ tpId: data["userName"], status: { "$in": ["DAAPPROVED", "DAREJECTED"] }, "toUsersRole": "Inspection Agency", "migration": { "$exists": false } }).sort({ "createdOn": -1 }).toArray()
    paymentWorkFlow = db.payments.find({ "userId": data["userName"], "isComplete": true, "migration": { "$exists": false } }).sort({ "_id": -1 }).toArray()
    if (workflow.length > 0 && paymentWorkFlow.length > 0) {
        //createdOn = workflow[0]["createdOn"]         
        transDate = paymentWorkFlow[0]["date"]
        if (data["updatedOn"] < transDate) {
            //data["updatedOn"] = createdOn           
            count++
        }
    }
})
print(count)

tpIds = [
    "TP040102",
    "TP034534",
    "TP039713",
    "TP061857",
    "TP061719",
    "TP061171",
    "TP060575",
    "TP060521",
    "TP065590",
    "TP066158",
    "TP057348",
    "TP058796",
    "TP063698",
    "TP067365",
    "TP057441",
    "TP059905",
    "TP059170",
    "TP058046",
    "TP056012",
    "TP059719",
    "TP059143",
    "TP059794",
    "TP059944",
    "TP057547",
    "TP062737",
    "TP061058",
    "TP062242",
    "TP064062",
    "TP055131",
    "TP063359",
    "TP053653",
    "TP064967",
    "TP043070",
    "TP062799",
    "TP062334",
    "TP062500",
    "TP061330",
    "TP062783",
    "TP060284",
    "TP055736",
    "TP059718",
    "TP062834",
    "TP064785",
    "TP066687",
    "TP056684",
    "TP063101",
    "TP064915",
    "TP057475",
    "TP065026",
    "TP067120",
    "TP060672",
    "TP059216",
    "TP060066",
    "TP063334",
    "TP057960",
    "TP059458",
    "TP064290",
    "TP065775",
    "TP060288",
    "TP064318",
    "TP052070",
    "TP059114",
    "TP060347",
    "TP061433",
    "TP059255",
    "TP059694",
    "TP065758",
    "TP041903",
]


count = 0
tpIds.forEach(data => {
    tpData = db.trainingpartner.findOne({ "userName": data, "isSmart": true })
    workflow = db.tpworkflow.find({ tpId: data, status: { "$in": ["DAAPPROVED", "DAREJECTED"] }, "toUsersRole": "Inspection Agency", "migration": { "$exists": false } }).sort({ "createdOn": -1 }).toArray()
    //paymentWorkFlow = db.payments.find({ "userId": data, "isComplete": true, "migration": { "$exists": false } }).sort({ "_id": -1 }).toArray()
    if (workflow.length > 0) {
        if (workflow[0]["createdOn"] > tpData["updatedOn"]) {
            tpData["updatedOn"] = workflow[0]["createdOn"]
            count++
        }
    }
    db.trainingpartner.save(tpData)
})
print(count)

//

tpIds = [
    "TP057641",
    "TP058602",
    "TP064529",
    "TP014966",
    "TP058578",
    "TP013155",
    "TP058770",
    "TP059000",
    "TP064848",
    "TP056846",
    "TP058682",
    "TP058746",
    "TP058963",
    "TP060553",
    "TP063312",
    "TP064541",
    "TP065377",
    "TP044652",
    "TP056935",
    "TP058591",
    "TP058594",
    "TP058612",
    "TP058646",
    "TP058714",
    "TP058825",
    "TP058957",
    "TP058964",
    "TP060290",
    "TP065179",
    "TP065331",
    "TP065383",
    "TP065570",
    "TP065598",
    "TP058606",
    "TP058673",
    "TP058679",
    "TP058691",
    "TP058852",
    "TP058931",
    "TP059005",
    "TP059008",
    "TP059238",
    "TP064681",
    "TP064758",
    "TP064917",
    "TP065032",
    "TP065370",
    "TP056912",
    "TP058495",
    "TP058563",
    "TP058636",
    "TP058720",
    "TP058902",
    "TP058961",
    "TP059867",
    "TP064870",
    "TP064913",
    "TP065338",
    "TP065345",
    "TP065533",
    "TP065740",
    "TP042394",
    "TP058628",
    "TP058891",
    "TP058954",
    "TP062402",
    "TP065214",
    "TP065562",
    "TP065680",
    "TP058855",
    "TP058878",
    "TP063475",
    "TP063480",
    "TP065751",
    "TP058667",
    "TP058674",
    "TP058706",
    "TP058725",
    "TP060577",
    "TP062530",
    "TP065058",
    "TP065651",
    "TP065328",
    "TP058723",
    "TP058756",
    "TP058933",
    "TP059070",
    "TP060190",
    "TP062153",
    "TP064782",
    "TP065390",
    "TP065750",
    "TP065827",
    "TP065926",
    "TP066146",
    "TP058684",
    "TP058780",
    "TP062733",
    "TP062809",
    "TP065698",
    "TP066372",
    "TP065859",
    "TP066468",
    "TP066429",
    "TP066735",
    "TP059006",
    "TP067251",
    "TP053627",
    "TP058657",
    "TP058880",
    "TP061267",
    "TP034945",
    "TP065566",
    "TP066025",
    "TP067159",
    "TP067298",
    "TP014959",
    "TP062424",
    "TP004637",
    "TP015942",
    "TP060711",
    "TP068344",
    "TP006088",
    "TP068231",
    "TP002599",
    "TP068368",
    "TP000400",
    "TP001711",
    "TP060519",
    "TP066572",
    "TP067200",
    "TP000051",
    "TP035541",
    "TP068218",
    "TP068972",
    "TP001287",
    "TP068411",
    "TP068897",
    "TP069037",

]


tpIds.forEach(data => {
    db.trainingpartner.find({ "userName": data }).forEach(tpData => {
        if (tpData && tpData["daReviews"].length > 0) {
            len = tpData["daReviews"].length
            //print("da status date: ", tpData["daReviews"][len - 1]["date"])
        } else {
            print(data, "not found")
        }
        workflowData = db.tpworkflow.find({ "tpId": data, "toUsersRole": "Inspection Agency" }).sort({ "_id": -1 }).toArray()
        //print("ia date: ", workflowData[0]["actionTakenOn"])
        db.tpworkflow.update({ "_id": workflowData[0]["_id"] },
            { "$set": { "actionTakenOn": tpData["daReviews"][len - 1]["date"] } })
    })
})

db.trainingpartner.find({ userName: "TP057641" }, { "daReviews.date": 1 }).pretty()

db.trainingpartner.find({ "isSmart": false, "tpSchemeDetails.approvalProcess": "aa", "updatedOn": { "$gte": ISODate("2020-03-00T00:00:00Z") } }).forEach(data => {

    workflow = db.tpworkflow.find({
        createdOn: { "$gte": ISODate("2020-03-00T00:00:00Z") },
        tpId: data["userName"],
        "toUsersRole": "Inspection Agency",
        "migration": { "$exists": false },
        "scheme": { "$exists": false }
    }).toArray()
    if (workflow.length > 0) {

        data["isSmart"] = true
        db.trainingpartner.save(data)
    }
})