var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    Parent;

var schema_name = new schema({
    email : {type : String, index : 1, unique : true , required : true},
    password : {type : String, unique : true , required : true},
    name : String,
    partner : String,
    timeJoined : String,
    childes : [{
        name : String,
        age: Number,
        allergies : [String]
    }],
    address : {
        city : String,
        street : String,
        houseNumber : Number
    },
    picturePath : String
}, {collection: 'parents'});

Parent = mongoose.model('Parent', schema_name);

module.exports = Parent;