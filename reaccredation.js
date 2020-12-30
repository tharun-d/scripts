db.trainingcentre.find({ userName: "TC100337" },
    { "jobRolesWentForReAccredation": 1, "accrediationCycle": 1 })

db.trainingcentre.update({ userName: "TC100337" },
    { "$set": { status: "DEACCREDIATED", "jobRoles.$[].sscStatus": "deaccrediated" } })

db.trainingcentre.update({ userName: "TC100337" },
    { "$set": { status: "Approved", "jobRoles.$[].sscStatus": "Accredited" } })