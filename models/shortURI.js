const mongoose = require('mongoose');
const shortid = require('shortid');

//DB Schema
const shortURISchema = mongoose.Schema({
    full: {
        type: String,
        required: true,
        trim: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    phone: Number
})

const shortURI = mongoose.model('shortURI', shortURISchema);

//Export the model
module.exports = shortURI