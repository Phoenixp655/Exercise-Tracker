const {Schema, default: mongoose, Types} = require('mongoose');


const exerciseSchema = Schema({
    desciption: String,
    duration: Number,
    date: String,
    user: String
})

module.exports = mongoose.model('Exercise', exerciseSchema)