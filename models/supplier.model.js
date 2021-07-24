const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    supplierName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    pinCode: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;