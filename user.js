var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User;

var schema_name = new schema({
    email : {type : String, index : 1, unique : true , required : true},
    password : String
}, {collection: 'users'});

User = mongoose.model('User', schema_name);

module.exports = User;
