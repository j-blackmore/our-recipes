const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    ingredients: { type: [String], default: [''] },
    method: { type: String, default: '' },
    extras: { type: [String], default: [''] },
    imageUrl: { type: String, default: '' },
    imageId: { type: String, default: '' },
    prepTime: { type: Number, default: 0 },
    cookTime: { type: Number, default: 0 },
    serves: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    creator: { type: String, default: '' }
});

module.exports = mongoose.model('Recipe', Recipe);
