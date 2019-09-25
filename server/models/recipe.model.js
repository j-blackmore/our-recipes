const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    title: { type: String },
    subtitle: { type: String },
    ingredients: { type: [String] },
    method: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Recipe', Recipe);