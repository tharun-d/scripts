db.trainingcentre.find({ userName: { "$in": ["TC055898"] } }).forEach(x => {
    var accDate = null
    var jn = null
    for (var i = 0; i < x['jobRoles'].length; i++) {
        if (x['jobRoles'][i]['sscStatus'] == 'Not Accrediated') {
            x['jobRoles'][i]['sscStatus'] = 'Conditionally Accrediated'
            x['jobRoles'][i]['status'] = 'Conditionally Accrediated'
            jn = x['jobRoles'][i]['qp']
            print(jn)
            accDate = x['jobRoles'][i]['accrediatedOn']
            db.tcworkflow.update({ "tcId": x['userName'], "status": "Not Accrediated", 'jobRole.qp': x['jobRoles'][i]['qp'] }, { "$set": { "status": 'Conditionally Accrediated' } })
            db.trainingcentre.save(x)
        }
    }
    var mc = db.smartmessagecenter.findOne({ tcid: x['userName'] })
    if (mc) {
        mc['stages'].pop()
        // Update a message to application stages so can be find that This TC is marked DNR to specific reason
        var stage = {
            "stage": "SSC has marked the Job Role Broadband Technician as Conditionally Accredited. Please pay Continuous Monitoring Fees and Affiliation Fees.",
            "stageDate": accDate ? accDate : new Date()
        }
        mc['stages'].push(stage)
        printjson(mc['stages'][mc['stages'].length - 1])
        db.smartmessagecenter.save(mc)
    }
})
