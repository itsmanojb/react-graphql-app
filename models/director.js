const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

module.exports = mongoose.model('Director', directorSchema);