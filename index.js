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
    Sitters = require('./sitters_modules'),
    db,
    SittersData = null,tempJson = null,
    tempParents,tempSitters,tempInvites,tempUsers;


mongoose.connect('mongodb://db_usr:db_pass@ds011913.mlab.com:11913/sitters');
db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


db.once('connected', function(){
    console.log('getting data from mongoDB');

    Parent.find({}, function(err,sittersData){
        tempParents = sittersData;
    });

    Sitter.find({}, function(err,sittersData){
        tempSitters = sittersData;
        SittersData = new Sitters(tempParents,tempSitters); // get all the json from mongoDB and send it to constructor
    });
});

app.get('/getAllParents', function(req,res){
    res.status(200).json(SittersData.getAllParents());
});

app.post('/getParentByEmail',function (req,res){
    res.status(200).json(SittersData.getParentByEmail(req.body.email));
});

app.post('/getChildesByEmail',function (req,res){
    res.status(200).json(SittersData.getChildesByEmail(req.body.email));
});

app.post('/getChildesByName',function (req,res){
    res.status(200).json(SittersData.getChildesByName(req.body.name));
});

app.get('/getAllSitters',function(req,res){
    res.status(200).json(SittersData.getAllSitters(req.body.email));
});


app.post('/getSitterByEmail' ,function(req,res){ //TODO:  send json in react
    res.status(200).json(SittersData.getSitterByEmail(req.body.email));
});

app.post('/getSitterByName' ,function(req,res){ //TODO:  send json in react
    res.status(200).json(SittersData.getSitterByName(req.body.name));
});

app.get('/getTopRatedSitters',function(req,res){
    res.status(200).json(SittersData.getTopRatedSitters());
});

app.get('/getAvailableNowSitters',function(req,res){
    res.status(200).json(SittersData.getAvailableNowSitters());
});


app.post('/getSittersByWorkingHours',function(req,res){
    res.status(200).json(SittersData.getSittersByWorkingHours(req.body.workingHours));
});

app.post('/getSitterByGender',function(req,res){
    res.status(200).json(SittersData.getSitterByGender(req.body.gender));
});

app.post('/insertSitter' ,function(req,res){ //TODO:  send json in react
    tempJson = new Sitter(req.body);
    tempJson.save(function(err , doc){
        if(err)
            console.log(err);// TODO: take care of error
        else
        {
            console.log('Sitter added');
            SittersData.insertSitter(req.body);
        }

        res.status(200).json(req.body); // just for debugging
    });
});

app.post('/updateSitter' ,function(req,res){ //TODO:  send json in react

    var query = Sitter.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.update({
            $set : req.body
        });
        query.exec(function(err,results){
            if(err){
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

app.post('/deleteSitter' ,function(req,res){ //TODO:  send json in react
    var query = Sitter.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.remove(function(err,deletedDoc){
            if (err){
                res.status(500).json(err);
                //TODO: error
                console.log(err);
            }
            else{
                console.log('deleted');
                res.status(200).json(SittersData.deleteSitter(req.body));
            }
        });
    });
});

app.post('/insertParent' ,function(req,res){ //TODO: send json in react
    tempJson = new Parent(req.body);
    tempJson.save(function(err , doc){
        if(err)
            console.log(err);// TODO: take care of error
        else
        {
            SittersData.insertParent(req.body);
            console.log('parent added');
        }


        res.status(200).json(req.body); // just for debugging
    });
});


app.post('/updateParent' ,function(req,res){

    var query = Parent.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.update({
            $set : req.body
        });
        query.exec(function(err,results){
            if(err){
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

app.post('/deleteParent' ,function(req,res){ //TODO:  send json in react

    var query = Parent.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.remove(function(err,deletedDoc){
            if (err){
                res.status(500).json(err);
                //TODO: error
                console.log(err);
            }
            else{
                console.log('deleted');
                res.status(200).json(SittersData.deleteParent(req.body));
            }
        });
    });
});

app.post('/insertInvite', function(req,res){
    var query = Parent.findOne().where('email',req.body.parentEmail);
    query.exec(function(err,doc){
       var query = doc.update({
           $push : {invites: req.body}
       });
         query.exec(function(err,results){
             //TODO: in case of error in internet
        });
    });

    var querySit = Sitter.findOne().where('email',req.body.sitterEmail);
    querySit.exec(function(err,doc){
        var query = doc.update({
            $push : {invites: req.body}
        });
        query.exec(function(err,results){
            res.status(200).json(SittersData.insertInvite(req.body));
            //TODO: in case of error in internet
            // TODO : insert uuid
        });
    });
});

app.post('/insertReview', function(req,res){
    var query = Sitter.findOne().where('email',req.body.sitterEmail);
    query.exec(function(err,doc){
        var query = doc.update({
            $push : {reviews: req.body}
        });
        query.exec(function(err,results){
            var rating = SittersData.insertReview(req.body);
            if ( rating.status == 'updated'){
                var query = Sitter.findOne().where('email',req.body.sitterEmail);
                query.exec(function(err,doc){
                    var query = doc.update({
                        $set : {'rating': rating.rating}
                    });
                    query.exec(function(err,results){
                        console.log('updated rating');
                    })
                });
            }// TODO : insert uuid
            //TODO: in case of error in internet
        });
    });
});

app.post('/getReviewsBySitterEmail', function(req,res){
    res.status(200).json(SittersData.getReviewsBySitterEmail(req.body.email));
});

app.post('/getParentFavoriteSitters', function(req,res){
    res.status(200).json(SittersData.getParentFavoriteSitters(req.body));
});

app.post('/getInvitesByParentEmail',function (req,res){
    res.status(200).json(SittersData.getInvitesByParentEmail(req.body.email));
});

app.post('/getInvitesBySitterEmail',function (req,res){
    res.status(200).json(SittersData.getInvitesBySitterEmail(req.body.email));
});

app.post('/updateInvite' ,function(req,res){

    res.status(200).json(SittersData.updateInvite(req.body));
    // var query = Invites.findOne().where('uuid',req.body.uuid);
    // query.exec(function(err,doc){
    //     var query = doc.update({
    //         $set : req.body
    //     });
    //     query.exec(function(err,results){
    //         if(err){
    //             console.log(err);
    //             res.status(500).json(err);
    //             //TODO: error
    //         }
    //         else {
    //             res.status(200).json(SittersData.updateInvite(req.body));
    //             console.log('updated');
    //         }
    //     })
    // });
    // res.status(200).json(req.body); // just for debugging
});

app.post('/updateReview' ,function(req,res){

    res.status(200).json(SittersData.updateReview(req.body));
    // var query = Invites.findOne().where('uuid',req.body.uuid);
    // query.exec(function(err,doc){
    //     var query = doc.update({
    //         $set : req.body
    //     });
    //     query.exec(function(err,results){
    //         if(err){
    //             console.log(err);
    //             res.status(500).json(err);
    //             //TODO: error
    //         }
    //         else {
    //             res.status(200).json(SittersData.updateInvite(req.body));
    //             console.log('updated');
    //         }
    //     })
    // });
    // res.status(200).json(req.body); // just for debugging
});

app.post('/deleteInvite' ,function(req,res){

    var query = Invites.findOne().where('uuid',req.body.uuid);
    query.exec(function(err,doc){
        var query = doc.remove(function(err,deletedDoc){
            console.log(deletedDoc);
        });
    });
    res.status(200).json(req.body); // just for debugging
});

app.get('/', function(req,res){
    res.status(400).json({'Error' : 'oops...  wrong path'});
});

app.all('*', function(req,res){
    res.status(400).json({'Error' : 'oops...  wrong path'});
});

http.createServer(app).listen(port);
console.log('server is on');
console.log('listening on port' + port);
