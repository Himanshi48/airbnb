const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportlocalmongoose); // it implement username password hash salt automatically

module.exports = mongoose.model('User', userSchema);