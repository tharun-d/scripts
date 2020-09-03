db.trainingcentre.aggregate([{
    "$match":
    {
        "$and": [{ "createdOn": { "$type": "date" } }],
        "processType": "Accreditation & Affiliation",
        "$or": [
            {
                "status": {
                    "$nin": ["init",
                        "TC_CREATED",
                        "paymentAwaiting",
                        "blocked",
                        "Deactivated/blocked",
                        "INACTIVE",
                        "DEACCREDIATED",
                        "applicationWithDrawl",]
                }
            },
            {
                "status": "applicationWithDrawl",
                "financeSpocStatusForApplicationWithdrawl": "Request for Refund",
            }
        ],
    }
}])


db.trainingcentre.aggregate([
    {
        "$match":
        {
            "daReviews": { "$exists": true },
            "$and": [{ "createdOn": { "$type": "date" } }],
            "processType": "Accreditation & Affiliation",
            "$or": [
                {
                    "status": {
                        "$nin": ["init",
                            "TC_CREATED",
                            "paymentAwaiting",
                            "blocked",
                            "Deactivated/blocked",
                            "INACTIVE",
                            "DEACCREDIATED",
                            "applicationWithDrawl",]
                    }
                },
                {
                    "status": "applicationWithDrawl",
                    "financeSpocStatusForApplicationWithdrawl": "Request for Refund",
                }
            ],
        }
    },

]).forEach(x => {
    if (!Array.isArray(x["daReviews"])) {
        if (typeof x["daReviews"] == "object") {
            print(x["userName"])
            db.trainingcentre.remove({ userName: x["userName"] })
        }
    }
})