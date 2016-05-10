var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Profile', profileSchema);