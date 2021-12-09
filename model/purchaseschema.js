const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    uid: Number,
    itemName: String,
    quantity: String,
    billDate: String,
    mrp: String,
    rate: String,
    tamt: String,
})

const pSchema = new mongoose.model("pSchema", purchaseSchema);

module.exports = pSchema;