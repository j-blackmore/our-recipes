const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    title: { type: String, default: '', required: true },
    subtitle: { type: String, default: '', required: true },
    ingredients: { type: [String], default: [''], required: true },
    method: { type: String, default: '', required: true },
    extras: { type: [String], default: [''] },
    imageUrl: { type: String, default: '' },
    imageId: { type: String, default: '' },
    prepTime: { type: Number, default: 0, required: true },
    cookTime: { type: Number, default: 0, required: true },
    serves: { type: Number, default: 0, required: true },
    createdAt: { type: Date, default: Date.now },
    creator: { type: String, default: '', required: true }
});

module.exports = mongoose.model('Recipe', Recipe);
