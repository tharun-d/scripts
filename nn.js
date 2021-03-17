db.ssc.updateMany({ "sector.name":"Automotive"},{$set:{"sscName": "Automotive Skills Development Council"}})
db.ssc.updateMany({ "sector.name":"Apparel"},{$set:{"sscName": "Apparel, Madeups & Home Furnishing Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Aerospace and Aviation"},{$set:{"sscName": "Aerospace and Aviation Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Beauty & Wellness"},{$set:{"sscName": "Beauty & Wellness Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"BFSI"},{$set:{"sscName": "Banking, Financial Services & Insurance (BFSI) Sector Skill Council of India"}})
db.ssc.updateMany({ "sector.name":"Capital Goods"},{$set:{"sscName": "Capital Goods Skill Council"}})
db.ssc.updateMany({ "sector.name":"Coating & Painting"},{$set:{"sscName": "Paints and Coatings Skill Council"}})
db.ssc.updateMany({ "sector.name":"Construction"},{$set:{"sscName": "Construction Skill Development Council of India"}})
db.ssc.updateMany({ "sector.name":"Domestic Workers"},{$set:{"sscName": "Domestic Workers Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Electronics"},{$set:{"sscName": "Electronic Sector Skill Council of India"}})
db.ssc.updateMany({ "sector.name":"Food Processing"},{$set:{"sscName": "Food Industry Capacity & Skill Initiative"}})
db.ssc.updateMany({ "sector.name":"Agriculture"},{$set:{"sscName": "Agriculture Skill Council of India"}})
db.ssc.updateMany({ "sector.name":"Furniture & Fittings"},{$set:{"sscName": "Furniture and Fittings Skill Council"}})
db.ssc.updateMany({ "sector.name":"Gem & Jewellery"},{$set:{"sscName": "Gems & Jewellery Skill Council of India"}})
db.ssc.updateMany({ "sector.name":"Green Jobs"},{$set:{"sscName": "Skill Council for Green Jobs"}})
db.ssc.updateMany({ "sector.name":"Handicrafts"},{$set:{"sscName": "Handicrafts and Carpet Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Handicrafts and Carpet"},{$set:{"sscName": "Handicrafts and Carpet Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Infrastructure Equipment"},{$set:{"sscName": "Infrastructure Equipment Skill Council"}})
db.ssc.updateMany({ "sector.name":"Iron and Steel"},{$set:{"sscName": "Indian Iron & Steel Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Leather"},{$set:{"sscName": "Leather Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Logistics"},{$set:{"sscName": "Logistics Skill Council"}})
db.ssc.updateMany({ "sector.name":"Management"},{$set:{"sscName": "Management & Entrepreneurship and Professional Skills Council"}})
db.ssc.updateMany({ "sector.name":"Media & Entertainment"},{$set:{"sscName": "Media & Entertainment Skills Council"}})
db.ssc.updateMany({ "sector.name":"Mining"},{$set:{"sscName": "Skill Council for Mining Sector"}})
db.ssc.updateMany({ "sector.name":"Hydrocarbon"},{$set:{"sscName": "Hydrocarbon Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Plumbing"},{$set:{"sscName": "Indian Plumbing Skills Council"}})
db.ssc.updateMany({ "sector.name":"Life Sciences"},{$set:{"sscName": "Life Sciences Sector Skill Development Council"}})
db.ssc.updateMany({ "sector.name":"Power"},{$set:{"sscName": "Power Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Rubber"},{$set:{"sscName": "Rubber Skill Development Council"}})
db.ssc.updateMany({ "sector.name":"Retail"},{$set:{"sscName": "Retailers Association’s Skill Council of India"}})
db.ssc.updateMany({ "sector.name":"Sports"},{$set:{"sscName": "Sports, Physical Education, Fitness and Leisure Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Strategic Manufacturing"},{$set:{"sscName": "STRATEGIC MANUFACTURING SECTOR SKILL COUNCIL"}})
db.ssc.updateMany({ "sector.name":"Healthcare"},{$set:{"sscName": "Healthcare Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Telecom"},{$set:{"sscName": "Telecom Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Textile"},{$set:{"sscName": "Textile Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"Tourism & Hospitality"},{$set:{"sscName": "Tourism and Hospitality Skill Council"}})
db.ssc.updateMany({ "sector.name":"IT-ITeS"},{$set:{"sscName": "IT-ITeS Sector Skill Council"}})
db.ssc.updateMany({ "sector.name":"PwD"},{$set:{"sscName": "Skill Council for PwD"}})
db.ssc.updateMany({ "sector.name":"Instrumentation"},{$set:{"sscName": "Instrumentation, Automation, Surveillance & Communication Sector Skill Council"}})


// 1

db.labArea.find({}).forEach(x => {
    db.qps.find({
        "qpCode": x["qpCode"]
    }).limit(1).forEach(y => {
        db.ssc.find({
            "sector.name": y["sectors"]["sectorName"],
            "sscName": {
                $exists: true
            }
        }).limit(1).forEach(z => {
            x.sscName = z.sscName
            db.labArea.save(x)
        })
    })
})


// 2

db.trainerPreRequisite.find({}).forEach(x => {
    db.qps.find({
        "qpCode": x["qpCode"]
    }).limit(1).forEach(y => {
        db.ssc.find({
            "sector.name": y["sectors"]["sectorName"],
            "sscName": {
                $exists: true
            }
        }).limit(1).forEach(z => {
            x.sscName = z.sscName
            db.trainerPreRequisite.save(x)
        })
    })
})

// 3
db.trainerPreRequisiteMigrated.find({}).forEach(x => {
    db.qps.find({
        "qpCode": x["qpCode"]
    }).limit(1).forEach(y => {
        db.ssc.find({
            "sector.name": y["sectors"]["sectorName"],
            "sscName": {
                $exists: true
            }
        }).limit(1).forEach(z => {
            x.sscName = z.sscName
            db.trainerPreRequisiteMigrated.save(x)
        })
    })
})

// 4

db.specificationreport.find({}).forEach(x => {
    db.ssc.find({
        "sector.name": x["sector"],
        "sscName": {
            $exists: true
        }
    }).limit(1).forEach(y => {
        x.sscName = y.sscName
        db.specificationreport.save(x)
    })
})