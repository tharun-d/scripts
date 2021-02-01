var photos = {
    "ramps": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "lift": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "firstaidkit": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "firefightingequipment": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "safedrinkingwater": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "dailyinspectioncard": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "emergencynumber": {
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "others": {
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "cistatus": "NotVerified",
        "ciPicTime": ""
    },
    "tccompleted": true,
    "washRoom": {
        "tcimgurl": "",
        "ciimgurl": "",
        "cicomment": "",
        "verified": false,
        "longitude": "",
        "latitude": "",
        "pictime": "",
        "cistatus": "NotVerified",
        "ciPicTime": ""
    }
}

db.trainingcentre.update({ "userName": "TC136798" }, { "$set": { "facilities.photos": photos } })


var abc =
{
    "tcphotos": [{
        "tcimgurl": "",
        "ciimgurl": "",
        "longitude": "",
        "latitude": "",
        "ciPicTime": "",
        "ciLatitude": "",
        "ciLongitude": ""
    },
    {
        "tcimgurl": "",
        "ciimgurl": "",
        "longitude": "",
        "latitude": "",
        "ciPicTime": "",
        "ciLatitude": "",
        "ciLongitude": ""
    }
    ],
    "verified": false,
    "tccompleted": true
}
db.trainingcentre.find({ "userName": "TC136798" }).forEach(tc => {
    tc.centreArea.forEach(x => {
        x.centerareaphotos = abc
    })
    db.trainingcentre.save(tc)
})