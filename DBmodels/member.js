const mongoose = require('mongoose');

// SCHEMA
let memberSchema = new mongoose.Schema({
    name : String,
    email : String,
    contact : String,
    usn : String,
    stream : String,
    year : String,
    interests: String

}) ;

// MOdel setup and exporting
module.exports = mongoose.model("Members",memberSchema);