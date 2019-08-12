const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require('../models/recipes');


// get all recipes
router.get('/', async (req, res, next) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes)
    } catch (err) {
        next(err);
    }
});

//get a recipe by id
router.get('/id=:id', async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.json(recipe);
    } catch (err) {
        next(err);
    }
});

// create a new recipe
router.post('/', async (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });

    try {
        const result = await recipe.save();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500);
        next(err);
    }
});

// update a recipe
router.patch('/id=:id', async (req, res, next) => {
    try {
        const recipe = {};
        for (const props of req.body) {
            recipe[props.property] = props.value;
        }
        const result = await Recipe.update({_id: req.params.id}, {$set: recipe});
    } catch (err) {
        next(err);
    }

});

// delete a recipe
router.delete('/id=:id', async (req, res, next) => {
    try {
        await Recipe.deleteOne({_id: req.params.id});
        res.sendStatus(200);
        
    } catch (err) {
        next(err);
    }
});


// Add an ingredient to a recipe
router.patch('/id=:id/ingredient', async (req, res, next) => {
    try {
        const ingredient = {}
        for(const props of req.body) {
            ingredient[props.property] = props.value;
        };
    
        const recipe = await Recipe.update({_id: req.params.id}, {$push: {ingredients: ingredient}});
        res.json(recipe);
    } catch (err) {
        next(err);
    }
});


// Update a recipe
router.put ('/id=:id', async (req, res, next) => {
    try {
        const recipe = await Recipe.update({_id: req.params.id}, {$set: req.body});
        res.json(recipe);
    } catch (err) {
        next(err);
    }
});

module.exports = router;