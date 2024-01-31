const mongoose = require('mongoose');

// Defining the Schema
const userSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type : String, required: true},
});

const userJournalSchema = new mongoose.Schema({
    email : {type: String, required : true},
    _id : {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}, 
});

const journalDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const journalSchema = new mongoose.Schema({
    user: userJournalSchema ,
    journal : journalDataSchema 
});


const User = mongoose.model('Users', userSchema);
const Journal = mongoose.model('Journal', journalSchema);

module.exports = {User, Journal};