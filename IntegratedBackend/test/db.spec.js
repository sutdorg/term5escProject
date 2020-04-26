const db = require("../db.js");

describe ('db test!', function () {
    const json = require('comment-json');
    const fs = require('fs');
    const configfileDB = fs.readFileSync("./configDB.json");
    let txtDB = configfileDB.toString();
    let configDB = json.parse(txtDB);
    it ('offlinetoOnline should return 1', function (done) {
        
        let agentDetails = {
            "jid_a": '1c9d3b0253a242a492ec234725d00c4f@sandbox-all-in-one-rbx-prod-1.rainbow.sbg',
            "AvailStatus": 'online'
        };

        db.start(configDB).then(() => {
            db.offlinetoOnline (agentDetails).then((res) => {
                if (res === 1) {
                    done();
                }
            })
        })
    });
    it ('onlineToOffline should return 1', function (done) {
        let agentDetails = {
            "jid_a": '1c9d3b0253a242a492ec234725d00c4f@sandbox-all-in-one-rbx-prod-1.rainbow.sbg',
            "AvailStatus": 'offline'
        };
        db.start(configDB).then(() => {
            db.offlinetoOnline (agentDetails).then ((res) => {
                if (res === 1) {
                    done();
                }
            })
        })
    });
    it ('addingAgent should return 1', function (done) {
        let agentDetails = {
            "AgentID": 515,
            "Skill1": 'Computer',
            "Skill2": 'Phone',
            "Skill3": 'Tablet',
            "Name": 'AgentCPT',
            "AvailStatus": 'online',
            "NumOfCus": 0,
            "jid_a": '1c9d3b0253a242a492ec234725d00c5g@sandbox-all-in-one-rbx-prod-1.rainbow.sbg'
        };
        db.start(configDB).then(() => {
            db.addingAgent(agentDetails).then ((res) => {
                if (res === 1) {
                    done();
                }
            })
        })
    });
    it ('Waiting will give agentAvailable === true', function (done) {
        let req = {
            'body': {
                'jid_c': '100'
            }
        }
        db.start(configDB).then(() => {
            db.waiting(req.body).then((res) => {
                if (res.agentAvailable === true) {
                    done();
                }
            })
        })
    });
}) 