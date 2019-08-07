const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    ingredients: [{
        ingredient: String,
        weight: String
    }]
});

module.exports('Recipe', recipeSchema);