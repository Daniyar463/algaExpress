const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');

const PaymentMoveSchema = new mongoose.Schema({
    userPayment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    permitPayment: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    replenish: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    debit: mongoose.Types.ObjectId,
    lastBalance: {
        type: Number,
    },
    status: {
        type: String,
        trim: true,
        enum: ['DEBIT', 'REPLENISH','REPLENISH_CASH'],
    }
});

PaymentMoveSchema.plugin(idValidator);
const PaymentMove = mongoose.model('PaymentMove', PaymentMoveSchema);

module.exports = PaymentMove;