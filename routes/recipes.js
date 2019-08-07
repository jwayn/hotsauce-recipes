const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require('../models/recipes');


// get all recipes
router.get('/', (req, res, next) => {
    res.status(200).json({

    })
});

// create a new recipe
router.post('/', async (req, res, next) => {
    new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    try {
        let result = await Recipe.save();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// update a recipe name
router.put('/:id', (req, res, next) => {

});

// delete a recipe
router.delete('/:id', (req, res, next) => {

});

// Get all ingredients for a recipe
router.get('/:id', (req, res, next) => {

});

// Add an ingredient to an existing recipe
router.post('/:id/ingredient', (req, res, next) => {

});

// Update an ingredient on an existing recipe
router.put('/:id/ingredient', (req, res, next) => {

});

// Delete an ingredient from an existing recipe
router.delete('/:id/ingredient', (req, res, next) => {

});