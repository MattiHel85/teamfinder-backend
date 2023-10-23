import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

// const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    profilePicUrl: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

// UserSchema.plugin(passportLocalMongoose, {
//     usernameField: 'emailAddress' // Use 'emailAddress' as the username field
// });

module.exports = model('User', UserSchema);