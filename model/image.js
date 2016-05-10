var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    data: {
        type: String,
        index: false,
        required: true
    },
    info: [
        {
            module: {
                type: String,
                unique: true,
                required: true
            },
            properties: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    desc: String,
                    type: {
                        type: String,
                        required: true
                    },
                    value: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
}, { autoIndex: false } );

module.exports = mongoose.model('Image', imageSchema);