const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    salesmanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salesman"
    },
    remarks: String,
    date: {
        type: Date,
        default: new Date()
    },
    mistryTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mistry"
    },
    architectTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Architect"
    },
    dealerTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dealer"
    },
    pmcTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PMC"
    }
});

module.exports = mongoose.model("Task", taskSchema)