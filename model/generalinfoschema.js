const mongoose = require("mongoose");

const generalinfoSchema = mongoose.Schema({
    userId: Number,
    medicalName: String,
    phone: String,
    email: String,
    state: String,
    address: String,
    zip: String,
    date: String,
});

const generalInfoS = new mongoose.model("generalInfo", generalinfoSchema);

module.exports = generalInfoS;