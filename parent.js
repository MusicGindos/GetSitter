var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    Parent;

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
    email : {type : String, unique : true , required : true},
    password : {type : String},
    name : String,
    profilePictureURL : String,
    fullPictureURL : String,
    partner : String,
    timeJoined : String,
    childes : [{
        name : String,
        age: Number,
        _id: schema.Types.ObjectId,    // must have field for child _id
        profilePictureURL : String,
        allergies : [String]
    }],
    address : {
        city : String,
        street : String,
        houseNumber : Number
    },
    invites : [Invites]
}, {collection: 'parents'});

Parent = mongoose.model('Parent', schema_name);
module.exports = Parent;
