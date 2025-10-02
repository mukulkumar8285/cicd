const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true 
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true 
    },
    fullName: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
