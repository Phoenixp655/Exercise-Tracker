const {Schema, default: mongoose} = require('mongoose');


const userSchema = Schema({
    username: String,
})

module.exports = mongoose.model('User', userSchema)