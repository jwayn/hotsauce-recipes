const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://hotsauce:${process.env.MONGO_PASS}@hotsauce-7z3xp.azure.mongodb.net/test?retryWrites=true&w=majority`)

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 8080;

app.use(express.json());




server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});