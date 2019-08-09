const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, default: 'Unnamed'},
    created: {type: Date, default: Date.now},
    ingredients: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        weight: String
    }]
});

module.exports = mongoose.model('Recipe', recipeSchema);