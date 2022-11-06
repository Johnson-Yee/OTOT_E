const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
        required: false,
    },
    card: {
        type: Object,
        required: false,
    },
    married_status: {
        type: Boolean,
        required: false
    },
});

module.exports = mongoose.model("users", userSchema);
