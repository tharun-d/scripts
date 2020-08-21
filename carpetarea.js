db.trainingcentre.find({ userName: { "$in": ["TC105376"] } }).forEach(k => {
    var totCarpetArea = null
    if (k['classroom'] && k['classroom'].length) {
        k['classroom'].forEach(l => {
            totCarpetArea += Number(l['carpetArea'])
        })
    }

    //printjson(totCarpetArea)

    if (k['laboratory'] && k['laboratory'].length) {
        k['laboratory'].forEach(l => {
            totCarpetArea += Number(l['carpetArea'])
        })
    }

    //printjson(totCarpetArea)

    if (k['hybrid'] && k['hybrid'].length) {
        k['hybrid'].forEach(l => {
            totCarpetArea += Number(l['carpetArea'])
        })
    }
    //printjson(totCarpetArea)

    if (k['centreArea'] && k['centreArea'].length) {
        k['centreArea'].forEach(l => {
            if (l['type'] != "Parking if any" && l['type'] != "Playground if any" &&
                l['type'] != "Any outside area which is a part of the Centre" && l['type'] != "Any Outside Area which is part of the Center" &&
                l['type'] != "Other Center Space" && l['type'] != "Play Ground (Where Training is not conducted)") {
                totCarpetArea += Number(l['carpetArea'])
            }
        })
    }
    totCarpetArea = Math.ceil(totCarpetArea)
    printjson(totCarpetArea)
    printjson(k["userName"])
    db.trainingcentre.update({ userName: k["userName"] }, { $set: { "totalCarpetArea": totCarpetArea } })
})

db.trainingcentre.find({ userName: "TC1500285" }, { totalCarpetArea: 1 })



//new grading ci level
db.trainingcentre.find({ "userName": "TC1500285" }, { "jobRoles.ciAdditionalArea.carpetArea": 1 }).pretty()
db.trainingcentre.find({ "userName": "TC1500285" }, { "jobRoles.ciAdditionalArea.additionalCoveredCarpetArea": 1 }).pretty()

db.trainingcentre.find({ "userName": "TC1500285" }, { "classroom.cireview.cicarpetArea": 1 }).pretty()
db.trainingcentre.find({ "userName": "TC1500285" }, { "laboratory.ciEquippedWith.cicarpetArea": 1 }).pretty()
db.trainingcentre.find({ "userName": "TC1500285" }, { "hybrid.ciEquippedWith.cicarpetArea": 1 }).pretty()

db.trainingcentre.find({ "userName": "TC1500285" }, { "centreArea.ciEquippedWith.cicarpetArea": 1 }).pretty()
///

db.trainingcentre.find({ userName: { "$in": ["TC1500285"] } }).forEach(k => {
    var totCarpetArea = null
    if (k['jobRoles'] && k['jobRoles'].length) {
        k['jobRoles'].forEach(l => {
            totCarpetArea += Number(l["ciAdditionalArea"]["carpetArea"])
            totCarpetArea += Number(l["ciAdditionalArea"]["additionalCoveredCarpetArea"])
        })
    }

    if (k['classroom'] && k['classroom'].length) {
        k['classroom'].forEach(l => {
            totCarpetArea += Number(l["cireview"]["cicarpetArea"])
        })
    }

    //printjson(totCarpetArea)

    if (k['laboratory'] && k['laboratory'].length) {
        k['laboratory'].forEach(l => {
            totCarpetArea += Number(l["ciEquippedWith"]["cicarpetArea"])
        })
    }

    //printjson(totCarpetArea)

    if (k['hybrid'] && k['hybrid'].length) {
        k['hybrid'].forEach(l => {
            totCarpetArea += Number(l["ciEquippedWith"]["cicarpetArea"])
        })
    }
    //printjson(totCarpetArea)

    if (k['centreArea'] && k['centreArea'].length) {
        k['centreArea'].forEach(l => {
            if (l['type'] != "Parking if any" && l['type'] != "Playground if any" &&
                l['type'] != "Any outside area which is a part of the Centre" && l['type'] != "Any Outside Area which is part of the Center" &&
                l['type'] != "Other Center Space" && l['type'] != "Play Ground (Where Training is not conducted)") {
                totCarpetArea += Number(l["ciEquippedWith"]["cicarpetArea"])
            }
        })
    }
    totCarpetArea = Math.ceil(totCarpetArea)
    printjson(totCarpetArea)
    printjson(k["userName"])
})