var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    Sitter;

var schema_name = new schema({
    email : {type : String, index : 1, unique : true , required : true},
    password : String,
    name : String,
    maxAge : Number,
    minAge : Number,
    timeJoined : String,
    hourFee : Number,
    workingHours : String,
    gender : String,
    rating : Number,
    address : {
        city : String,
        street : String,
        houseNumber : Number
    },
    picturePath : String,
    reviews : [{
        date : String,
        parentName : String,

        picture : String,
        rating : Number,
        review : String
    }],
    invites : [{
        sitterEmail : String,
        parentEmail : String,
        street : String,
        date : String,
        recurring : String ,
        startTime : String,
        endTime : String,
        uuid : String,
        status : String
    }]
    //TODO : add gender to sitter and mongoDB
}, {collection: 'sitters'});

Sitter = mongoose.model('Sitter', schema_name);

module.exports = Sitter;
