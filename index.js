var express = require('express'),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 3000,
    fs = require('fs'),
    uuid = require('node-uuid'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Parent = require('./parent'),
    Sitter = require('./sitter'),
    moment = require('moment'),
    Sitters = require('./sitters_modules'),
    cors = require('cors'),
    db,
    SittersData = null,
    tempJson = null,
    tempParents,
    tempSitters;
moment().format();

mongoose.connect('mongodb://db_usr:db_pass@ds027215.mlab.com:27215/sitters');
db = mongoose.connection;
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    next();
});


db.once('connected', function () {
    console.log('getting data from mongoDB');
    Parent.find({}, function (err, sittersData) {
        tempParents = sittersData;
    });
    Sitter.find({}, function (err, sittersData) {
        tempSitters = sittersData;
        SittersData = new Sitters(tempParents, tempSitters); // get all the json from mongoDB and send it to the ctor
    });
    console.log('done getting data from mongo');
});


app.get('/getAllParents', function (req, res) {
    res.status(200).json(SittersData.getAllParents());
});

app.post('/getParentByEmail', function (req, res) {
    res.status(200).json(SittersData.getParentByEmail(req.body.email));
});

app.post('/getChildByEmail', function (req, res) {
    res.status(200).json(SittersData.getChildByEmail(req.body.email));
});

app.post('/getChildByName', function (req, res) {
    res.status(200).json(SittersData.getChildByName(req.body.name));
});

app.get('/getAllSitters', function (req, res) {
    res.status(200).json(SittersData.getAllSitters(req.body.email));
});

app.post('/getSitterByEmail', function (req, res) { //TODO:  send json in react
    res.status(200).json(SittersData.getSitterByEmail(req.body.email));
});

app.post('/getSitterByName', function (req, res) { //TODO:  send json in react
    res.status(200).json(SittersData.getSitterByName(req.body.name));
});

app.get('/getTopRatedSitters', function (req, res) {
    res.status(200).json(SittersData.getTopRatedSitters());
});

app.get('/getAvailableNowSitters', function (req, res) {
    res.status(200).json(SittersData.getAvailableNowSitters());
});

app.post('/getSittersByWorkingHours', function (req, res) {
    res.status(200).json(SittersData.getSittersByWorkingHours(req.body.workingHours));
});

app.post('/getSittersByGender', function (req, res) {
    res.status(200).json(SittersData.getSittersByGender(req.body.gender));
})

app.post('/getSittersByRating', function (req, res) {
    res.status(200).json(SittersData.getSittersByRating(req.body.rating));
});


app.post('/getUser', function (req, res) {
    var temp = SittersData.getParentByEmail(req.body.email);
    if (!temp.Error) { // no parent found
        temp["isParent"] = "true";
        res.status(200).json(temp.isParent);
    }
    else {
        temp = SittersData.getSitterByEmail(req.body.email);
        if (!temp.Error) { // no parent found
            temp.isParent = "false";
            res.status(200).json(temp);
        }
        else
            res.status(200).json({"Error": "No such a user found"});
    }
});


app.post('/insertSitter', function (req, res) { //TODO:  send json in react
    tempJson = new Sitter(req.body);
    tempJson.timeJoined = moment();//TODO: can use Date.now() - to see later
    tempJson.save(function (err, doc) {
        if (err) {
            console.log(err);// TODO: take care of error
            res.status(200).json({'status': "error"});
        }
        else {
            SittersData.insertSitter(req.body);
            console.log('sitter added');
            res.status(200).json({'status': "ok"});
        }
    });
});

app.post('/getFirstChild', function (req, res) {
    res.status(200).json(SittersData.getFirstChild(req.body.email));
});

app.post('/updateSitter', function (req, res) { //TODO:  send json in react
    var query = Sitter.findOne().where('email', req.body.email);
    query.exec(function (err, doc) {
        var query = doc.update({
            $set: req.body
        });
        query.exec(function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
                //TODO: error
            }
            else {
                res.status(200).json(SittersData.updateSitter(req.body));
                console.log('updated');
            }
        })
    });
});

app.post('/deleteSitter', function (req, res) { //TODO:  send json in react
    var query = Sitter.findOne().where('email', req.body.email);
    query.exec(function (err, doc) {
        var query = doc.remove(function (err, deletedDoc) {
            if (err) {
                res.status(500).json(err);
                //TODO: error
                console.log(err);
            }
            else {
                console.log('deleted');
                res.status(200).json(SittersData.deleteSitter(req.body));
            }
        });
    });
});

app.post('/insertParent', function (req, res) {
    tempJson = new Parent(req.body);
    tempJson.save(function (err, doc) {
        if (err) {
            console.log(err);// TODO: take care of error
            res.status(200).json(err);
        }
        else {
            SittersData.insertParent(req.body);
            res.status(200).json({'status': "ok"});
        }
    });
});


app.post('/updateParent', function (req, res) {
    var query = Parent.findOne().where('email', req.body.email);
    query.exec(function (err, doc) {
        var query = doc.update({
            $set: req.body
        });
        query.exec(function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
                //TODO: error
            }
            else {
                res.status(200).json(SittersData.updateParent(req.body));
                console.log('updated');
            }
        })
    });

});

app.post('/deleteParent', function (req, res) { //TODO:  send json in react
    var query = Parent.findOne().where('email', req.body.email);
    query.exec(function (err, doc) {
        var query = doc.remove(function (err, deletedDoc) {
            if (err) {
                res.status(500).json(err);
                //TODO: error
                console.log(err);
            }
            else {
                console.log('deleted');
                res.status(200).json(SittersData.deleteParent(req.body));
            }
        });
    });
});

app.post('/insertInvite', function (req, res) {
    var invite = req.body;
    if (!req.body.uuid)
        invite.uuid = uuid.v1();
    var query = Parent.findOne().where('email', invite.parentEmail);
    query.exec(function (err, doc) {
        var query = doc.update({
            $push: {invites: invite}
        });
        query.exec(function (err, results) {
            //TODO: in case of error in internet
        });
    });

    var querySit = Sitter.findOne().where('email', invite.sitterEmail);
    querySit.exec(function (err, doc) {
        var query = doc.update({
            $push: {invites: invite}
        });
        query.exec(function (err, results) {
            res.status(200).json(SittersData.insertInvite(invite));
            //TODO: in case of error in internet
        });
    });
});

app.post('/insertReview', function (req, res) {
    var review = req.body;
    review.uuid = uuid.v1();
    var query = Sitter.findOne().where('email', review.sitterEmail);
    query.exec(function (err, doc) {
        var query = doc.update({
            $push: {reviews: review}
        });
        query.exec(function (err, results) {
            var rating = SittersData.insertReview(review);
            if (rating.status == 'updated') {
                var query = Sitter.findOne().where('email', review.sitterEmail);
                query.exec(function (err, doc) {
                    var query = doc.update({
                        $set: {'rating': rating.rating}
                    });
                    query.exec(function (err, results) {
                        console.log('updated rating');
                        res.json({'status': 'ok'});
                    })
                });
            }
            //TODO: in case of error in internet
        });
    });
});

app.post('/getReviewsBySitterEmail', function (req, res) {
    res.status(200).json(SittersData.getReviewsBySitterEmail(req.body.email));
});

app.post('/getParentFavoriteSitters', function (req, res) {
    res.status(200).json(SittersData.getParentFavoriteSitters(req.body));
});

app.post('/getInvitesByParentEmail', function (req, res) {
    res.status(200).json(SittersData.getInvitesByParentEmail(req.body.email));
});

app.post('/getInvitesBySitterEmail', function (req, res) {
    res.status(200).json(SittersData.getInvitesBySitterEmail(req.body.email));
});

app.post('/updateInvite', function (req, res) {
    SittersData.updateInvite(req.body);
    Parent.collection.update({"invites.uuid": req.body.uuid}, {$set: {"invites.$": req.body}}, function (error, result) {
        if (error)
            res.json({'Status': 'error'});
    });
    Sitter.collection.update({"invites.uuid": req.body.uuid}, {$set: {"invites.$": req.body}}, function (error, result) {
        if (error)
            res.json({'Status': 'error'});
    });
    res.status(200).json({'status': 'updated'});
});

app.post('/updateReview', function (req, res) {
    res.status(200).json(SittersData.updateReview(req.body));
    //TODO: update review in mongoDB
});

app.get('/', function (req, res) {
    res.status(400).json({'Error': 'oops...  wrong path'});
});

app.all('*', function (req, res) {
    res.status(400).json({'Error': 'oops...  wrong path'});
});

http.createServer(app).listen(port);
console.log('server is on');
console.log('listening on port ' + port);
