var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    Invites;

var schema_name = new schema({
    sitterEmail : String,
    parentEmail : String,
    street : String,
    date : String,
    recurring : String,
    startTime : String,
    endTime : String
    //TODO: add status - waiting for default and accepted/declined for sitter
}, {collection: 'invites'});

Invites = mongoose.model('Invites', schema_name);

module.exports = Invites;
