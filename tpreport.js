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

count =0
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
    'TP034534',
    'TP016583',
    'TP016567',
    'TP016578',
    'TP016652',
    'TP016615',
    'TP016577',
    'TP007903',
    'TP016187',
    'TP000378',
    'TP001340',
    'TP001760',
    'TP039713',
    'TP040102',
    'TP041903',
    'TP043070',
    'TP052070',
    'TP053653',
    'TP055131',
    'TP055736',
    'TP056012',
    'TP056684',
    'TP057348',
    'TP057441',
    'TP057475',
    'TP057547',
    'TP057960',
    'TP058046',
    'TP058796',
    'TP059114',
    'TP059143',
    'TP059170',
    'TP059216',
    'TP059255',
    'TP059458',
    'TP059694',
    'TP059718',
    'TP059719',
    'TP059794',
    'TP059905',
    'TP059944',
    'TP060066',
    'TP060284',
    'TP060288',
    'TP060347',
    'TP060521',
    'TP060575',
    'TP060672',
    'TP061058',
    'TP061171',
    'TP061330',
    'TP061421',
    'TP061433',
    'TP061719',
    'TP061857',
    'TP062242',
    'TP062334',
    'TP062500',
    'TP062737',
    'TP062783',
    'TP062799',
    'TP062834',
    'TP063101',
    'TP063334',
    'TP063359',
    'TP063698',
    'TP064062',
    'TP064290',
    'TP064318',
    'TP064785',
    'TP064915',
    'TP064967',
    'TP065026',
    'TP065367',
    'TP065590',
    'TP065758',
    'TP065775',
    'TP066158',
    'TP066672',
    'TP066687',
    'TP067120',
    'TP067365'
]


count = 0
tpIds.forEach(data => {
    tpData = db.trainingpartner.findOne({ "userName": data, "isSmart": true })
    workflow = db.tpworkflow.find({ tpId: data, status: { "$in": ["DAAPPROVED", "DAREJECTED"] }, "toUsersRole": "Inspection Agency", "migration": { "$exists": false } }).sort({ "createdOn": -1 }).toArray()
    paymentWorkFlow = db.payments.find({ "userId": data, "isComplete": true, "migration": { "$exists": false } }).sort({ "_id": -1 }).toArray()
    if (workflow.length > 0 && paymentWorkFlow.length > 0) {
        if (paymentWorkFlow[0]["date"] > tpData["updatedOn"]) {
            tpData["updatedOn"] = workflow[0]["createdOn"]
            count++
        }
    }
    db.trainingpartner.save(tpData)
})
print(count)