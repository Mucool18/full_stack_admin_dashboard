const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    Transation: Array,
    role: {
        type: String,
        enum:["user", "admin", "superadmin"],
        default: "admin"
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User