var express = require('express'),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 3000,
    fs = require('fs'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://db_usr:db_pass@ds011913.mlab.com:11913/sitters'),
    User = require('./student'),
    ShenkarGrades = require('./grades_modules'),
    sitters = null,tempJson = null;


mongoose.connection.once('open', function(){
    User.find({}, function(err,sittersData){
        console.log("connection established to mongoDB\nyou can now use the functions");
        sitters = new Sitters(sittersData); // get all the json from mongoDB and send it to constructor
        mongoose.disconnect();
    });
});

app.get('/getAllData', function(req,res){
    res.status(200).json(sitters.getAllStudentsGrades());
});

app.get('/getStudGradeById/:id', function(req,res){
    tempJson = sitters.getStudGradeById(req.params.id);
    if (tempJson.status == false){
        res.set('header-getStudGradeById',"wrong id input");
        res.status(400).json(tempJson);
    }
    else
        res.status(200).json(tempJson);
});

app.get('', function(req,res){
    tempJson = sitters.getExcellenceByYear(req.params.year);
    if (tempJson.status == false){
        res.set('header-getExcellenceByYear',"cant find any studnet in the year");
        res.status(400).json(tempJson);
    }
    else
        res.status(200).json(tempJson);
});

app.get('', function(req,res){
    tempJson = sitters.getWorstAverageByYear(req.params.year);
    if (tempJson.status == false){
        res.set('header-getWorstAverageByYear',"cant find any studnet in the year");
        res.status(400).json(tempJson);
    }
    else
        res.status(200).json(tempJson);
});

app.get('/', function(req,res){
    res.status(400).json({'Error' : 'oops... you pressed wrong path, please look at the api',
        'api': ''});
});


app.all('*', function(req,res){
    res.status(400).json({'Error' : 'oops... you pressed wrong path, please look at the api',
        'api': ''});
});

http.createServer(app).listen(port);
console.log('server is on');
console.log('listening on port' + port);
