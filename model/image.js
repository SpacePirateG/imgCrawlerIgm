var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = Schema({
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
                    value: {
                        type: Schema.Types.Mixed,
                        required: true
                    }
                }
            ]
        }
    ]
}, { autoIndex: false } );

module.exports = mongoose.model('Image', imageSchema);