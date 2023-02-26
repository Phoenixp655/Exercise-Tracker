const {Schema, default: mongoose} = require('mongoose');


const exerciseSchema = Schema({
    description: String,
    duration: Number,
    date: String,
    users: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Exercise', exerciseSchema)