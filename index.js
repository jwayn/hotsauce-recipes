const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://hotsauce:${process.env.MONGO_PASS}@hotsauce-7z3xp.azure.mongodb.net/test?retryWrites=true&w=majority`)

//Routes imports
const recipes = require('./routes/recipes');

const app = express();

app.use(express.json());

//routes
app.use('/api/recipes', recipes);
//app.use('/api', index);


app.use(express.static(__dirname + '/public'));



//error handler middleware
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});


app.listen(8080, () => console.log('Server started on port 8080.'));