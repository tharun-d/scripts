db.trainingcentre.find(
    {
        "continuousMonitoringPayment": "init",
        "status": "Qualified"
    },
    { "userName": 1 }
).sort({ "_id": -1 })

db.trainingcentre.update(
    {
        "userName": "TC1500361",
        "status": "Qualified"
    },
    {
        $set: {
            "continuousMonitoringPayment": "init"
        }
    }
)

db.trainingcentre.update(
    {
        "userName": "TC1500317"
    },
    {
        $set: {
            "address.address1": "hello world"
        }
    }
)

db.tccontinuousmonitoring.remove(
    { userName: "TC1500317" }
)

db.cmStatusLog.remove(
    { tcUserName: "TC1500317" }
)

db.tccontinuousmonitoring.find(
    { userName: "TC1500317" },
    { "yearlyReport.0.address": 1 }
)

// to get notification
db.cmStatusLog.update(
    {
        "tcUserName": "TC300036",
        "quarterNumber": 1,
    },
    {
        $set: {
            "notificationDate": ISODate("2020-04-29T00:00:00Z"),
        }
    }
)
//
db.cmStatusLog.find(
    {
        "tcUserName": "TC920028",
    }
)


// to change mobile and email

db.trainingcentre.update(
    {
        "userName": "TC300036",
    },
    {
        $set: {
            "spoc.email": "pooja.v@transneuron.com",
            "spoc.mobileNumber": NumberLong(7892463800),

        }
    }
)
db.trainingcentre.update(
    {
        "userName": "TC920028",
    },
    {
        $set: {
            "spoc.email": "tharun.d@transneuron.com",
            "spoc.mobileNumber": NumberLong(9490285247),

        }
    }
)
db.trainingcentre.update({ userName: "TC1500361" }, { $set: { "continuousMonitoringPayment": "init" } })
db.tccontinuousmonitoring.remove({ userName: { "nin": ["TC1500361"] } })
db.tccontinuousmonitoring.remove({ userName: "TC103830" })
db.cmStatusLog.find({ tcUserName: "TC1500379" })
db.cmworkflow.find({ tcId: "TC1500361" })

///

tcIds = [{ tcId: "TC020283", name: "Pedicurist and Manicurist" },
{ tcId: "TC006145", name: "Pedicurist and Manicurist" },
{ tcId: "TC008936", name: "Pedicurist and Manicurist" },
{ tcId: "TC023502", name: "Pedicurist and Manicurist" },
{ tcId: "TC031740", name: "Assistant Hair Stylist" },
{ tcId: "TC021224", name: "Pedicurist and Manicurist" },
{ tcId: "TC021485", name: "Pedicurist and Manicurist" },
{ tcId: "TC026192", name: "Pedicurist and Manicurist" },
{ tcId: "TC042122", name: "Pedicurist and Manicurist" },
{ tcId: "TC023394", name: "Assistant Beauty Therapist" },
{ tcId: "TC000001", name: "Nail Technician" },
{ tcId: "TC030404", name: "Pedicurist and Manicurist" },
{ tcId: "TC031807", name: "Beauty Therapist" },
{ tcId: "TC006029", name: "Pedicurist and Manicurist" },
{ tcId: "TC018410", name: "Pedicurist and Manicurist" },
{ tcId: "TC021641", name: "Pedicurist and Manicurist" },
{ tcId: "TC027488", name: "Beauty Therapist" },
{ tcId: "TC010406", name: "Assistant Beauty Therapist" },
{ tcId: "TC033860", name: "Beauty Therapist" },
{ tcId: "TC028966", name: "Pedicurist and Manicurist" },
{ tcId: "TC007116", name: "Pedicurist and Manicurist" },
{ tcId: "TC028845", name: "Pedicurist and Manicurist" },
{ tcId: "TC005904", name: "Pedicurist and Manicurist" },
{ tcId: "TC002995", name: "Pedicurist and Manicurist" },
{ tcId: "TC011511", name: "Pedicurist and Manicurist" },
{ tcId: "TC009528", name: "Beauty Therapist" },
{ tcId: "TC040699", name: "Beauty Therapist" },
{ tcId: "TC012922", name: "Pedicurist and Manicurist" },
{ tcId: "TC031815", name: "Pedicurist and Manicurist" },
{ tcId: "TC000462", name: "Assistant Hair Stylist" },
{ tcId: "TC021963", name: "Pedicurist and Manicurist" },
]
count = 0
tcIds.forEach(data => {
    db.tcworkflow.remove({ tcId: data["tcId"], "jobRole.name": data["name"], status: "New Request", "assignedNextUserRole": "SSC" })
    count = count + 1
})
print(count)


count = 0
tcIds = [
    "TC126886",
    "TC127867",
    "TC124837",
    "TC118697",
    "TC123334",
    "TC121403",
    "TC121430",
    "TC123201",
    "TC121085",
    "TC120816",
    "TC120365",
    "TC120263",
    "TC115655",
    "TC118473",
    "TC118718",
    "TC113849",
    "TC116228",
    "TC115688",
    "TC114821",
    "TC111430",
    "TC112899",
    "TC113223",
    "TC112474",
    "TC111051",
    "TC111329",
    "TC109966",
    "TC107018",
    "TC107898",
    "TC106016",
    "TC109089",
    "TC107246",
    "TC107732",
    "TC100422",
    "TC104828",
    "TC104956",
    "TC105505",
    "TC104370",
    "TC104370",
    "TC100379",
    "TC104042",
    "TC103888",
    "TC100379",
    "TC102001",
    "TC100735",
]

tcIds.forEach(data => {
    db.trainingcentre.update({ userName: data }, { "$set": { "typeOfTrainingCenter.name": "TP Owned" } })
    count = count + 1
})
print(count)


tcIds = ["TC122741",
    "TC124602",
    "TC114987",
    "TC108669",
    "TC001704",
    "TC122760",
    "TC111419",
    "TC112669",
    "TC118073",
    "TC126049",
    "TC126066",
    "TC060716",
    "TC117454",
    "TC126235",
    "TC036797",
    "TC055549",
    "TC121371",
    "TC110551",
    "TC106021",
    "TC113320",
    "TC124800",
    "TC124963",
    "TC124729",
    "TC121246",
    "TC001594",
    "TC126307",
    "TC123227",
    "TC040990",
    "TC054735",
    "TC056378",
    "TC013457",
    "TC062197",
    "TC122921",
    "TC124541",
    "TC042058",
    "TC117781",
    "TC124860",
    "TC101941",
    "TC111844",
    "TC112841",
    "TC126230",
    "TC114861",
    "TC060949",
    "TC028952",
    "TC060833",
    "TC037552",
    "TC121799",
    "TC123871",
    "TC122117",
    "TC041259",
    "TC041764",
    "TC060217",
    "TC119066",
    "TC039542",
    "TC121984",
    "TC126237",
    "TC121671",
    "TC124423",
    "TC105777",
    "TC049427",
    "TC123667",
    "TC058390",
    "TC050329",
    "TC111146",
    "TC111154",
    "TC122052",
    "TC049494",
    "TC124581",
    "TC101274",
    "TC111917",
    "TC060638",
    "TC123438",
    "TC111169",
    "TC059794",
    "TC125091",
    "TC118994",
    "TC059289",
    "TC061946",
    "TC124614",
    "TC061207",
    "TC121434",
    "TC106402",
    "TC125273",
    "TC111580",
    "TC111519",
    "TC124457",
    "TC124465",
    "TC123647",
    "TC115697",
    "TC123020",
    "TC123224",
    "TC124319",
    "TC124504",
    "TC124513",
    "TC124520",
    "TC124533",
    "TC124534",
    "TC124537",
    "TC124742",
    "TC124123",
    "TC124613",
    "TC124886",
    "TC125024",
    "TC125004",
    "TC123218",
    "TC125313",
    "TC121473"]

tcIds.forEach(data => {
    var mc = db.smartmessagecenter.findOne({ tcid: data })
    if (mc) {

        var stage = {
            "stage": "Based on SR5002 Due to COVID-19, accepted inspection date shall be re-assigned",
            "stageDate": new Date()
        }
        mc['stages'].push(stage)
        printjson(mc['stages'][mc['stages'].length - 1])
        db.smartmessagecenter.save(mc)
    }
})

