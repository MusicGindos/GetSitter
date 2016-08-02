var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    Sitter;

var Invites = new schema({
    sitterEmail : String,
    parentEmail : String,
    street : String,
    date : String,
    recurring : String ,
    startTime : String,
    endTime : String,
    uuid : String,
    allergies : [String],
    status : String
});

var schema_name = new schema({
    email : {type : String, index : 1, unique : true , required : true},
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
    profilePictureURL : String,
    fullPictureURL : String,
    reviews : [{
        date : String,
        parentName : String,
        parentEmail : String,
        sitterEmail : String,
        pictureParent : String,
        rating : Number,
        review : String
    }],
    invites : [Invites]
}, {collection: 'sitters'});

Sitter = mongoose.model('Sitter', schema_name);
module.exports = Sitter;
