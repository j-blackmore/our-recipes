const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, default: '', required: true },
    ingredients: { type: [String], required: true },
    method: { type: String, required: true },
    extras: { type: [String], default: [''] },
    imageUrl: { type: String, default: '' },
    imageId: { type: String, default: '' },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    serves: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    creator: { type: String, default: '' }
});

module.exports = mongoose.model('Recipe', recipeSchema);
