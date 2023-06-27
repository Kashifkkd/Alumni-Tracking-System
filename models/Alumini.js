const mongoose = require('mongoose');

const aluminiSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    branch: {
        type: String,
    },
    gyear: {
        type: Number,
    },
    currentcompany: {
        type: String,
    },
    specializations: {
        type: String,
    },
    contactinfo: {
        type: Number,
    },
    gmail: {
        type: String,
    }

})

const Alumini = mongoose.model('Alumini', aluminiSchema);
module.exports = Alumini;
