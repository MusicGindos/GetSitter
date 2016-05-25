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
    Invites = require('./invites'),
    Sitters = require('./sitters_modules'),
    Users = require('./user'),
    db,
    SittersData = null,tempJson = null,
    tempParents,tempSitters,tempInvites,tempUsers;


mongoose.connect('mongodb://db_usr:db_pass@ds011913.mlab.com:11913/sitters');
db = mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


db.once('connected', function(){
    console.log('getting data');
    Invites.find({}, function(err,sittersData){
        tempInvites = sittersData;
    });

    Parent.find({}, function(err,sittersData){
        tempParents = sittersData;
    });

    Users.find({}, function(err,sittersData){
        tempUsers = sittersData;
    });

    Sitter.find({}, function(err,sittersData){
        tempSitters = sittersData;
        SittersData = new Sitters(tempParents,tempSitters,tempInvites,tempUsers); // get all the json from mongoDB and send it to constructor
       // mongoose.disconnect(); // TODO: need to think of when to close connection
    });
});

app.get('/getAllParents', function(req,res){
    res.status(200).json(SittersData.getAllParents());

});



app.post('/insertUser' ,function(req,res){ //TODO:  send json in react
    tempJson = new Users(req.body);
    tempJson.save(function(err , doc){
       if(err)
           console.log(err);// TODO: take care of error
        else
           console.log(req.body);
        res.status(200).json(req.body); // just for debugging
    });
});

app.post('/updateUser' ,function(req,res){ //TODO:  send json in react

        var query = Users.findOne().where('email',req.body.email);
        query.exec(function(err,doc){
            var query = doc.update({
                $set : req.body
            });
            query.exec(function(err,results){
                console.log('updated');
            })
        });
    res.status(200).json(req.body); // just for debugging
});

app.post('/deleteUser' ,function(req,res){ //TODO:  send json in react

    var query = Users.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.remove(function(err,deletedDoc){
            console.log(deletedDoc);
        });
    });
    res.status(200).json(req.body); // just for debugging
});

app.post('/insertSitter' ,function(req,res){ //TODO:  send json in react
    tempJson = new Sitter(req.body);
    tempJson.save(function(err , doc){
        if(err)
            console.log(err);// TODO: take care of error
        else
            console.log(req.body);
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
            console.log('updated');
        })
    });
    res.status(200).json(req.body); // just for debugging
});

app.post('/deleteSitter' ,function(req,res){ //TODO:  send json in react

    var query = Sitter.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.remove(function(err,deletedDoc){
            console.log(deletedDoc);
        });
    });
    res.status(200).json(req.body); // just for debugging
});

app.post('/insertParent' ,function(req,res){ //TODO: send json in react
    tempJson = new Parent(req.body);
    tempJson.save(function(err , doc){
        if(err)
            console.log(err);// TODO: take care of error
        else
            console.log(req.body);
        SittersData.insertParent(req.body); 
        res.status(200).json(req.body); // just for debugging
    });
});

app.post('/updateParent' ,function(req,res){ //TODO:  send json in react

    var query = Parent.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.update({
            $set : req.body
        });
        query.exec(function(err,results){
            console.log('updated');
        })
    });
    res.status(200).json(req.body); // just for debugging
});

app.post('/deleteParent' ,function(req,res){ //TODO:  send json in react

    var query = Parent.findOne().where('email',req.body.email);
    query.exec(function(err,doc){
        var query = doc.remove(function(err,deletedDoc){
            console.log(deletedDoc);
        });
    });
    res.status(200).json(req.body); // just for debugging
});

app.post('/insertInvite' ,function(req,res){ //TODO:  send json in react
    tempJson = new Invites(req.body);
    tempJson.uuid = uuid.v4();
    tempJson.save(function(err , doc){
        if(err)
            console.log(err);// TODO: take care of error
        else
            console.log(req.body);
        res.status(200).json(tempJson); // just for debugging
    });
});

app.post('/updateInvite' ,function(req,res){ //TODO:  send json in react

    var query = Invites.findOne().where('uuid',req.body.uuid);
    query.exec(function(err,doc){
        var query = doc.update({
            $set : req.body
        });
        query.exec(function(err,results){
            console.log('updated');
        })
    });
    res.status(200).json(req.body); // just for debugging
});

app.post('/deleteInvite' ,function(req,res){ //TODO:  send json in react

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
