const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const movieRoutes = require('./routes/movie-routes'); 


const PORT = 3000;
const URL = 'mongodb://localhost:27017/moviebox';
const URL_2 = 'mongodb+srv://adekvatofarvater:rAaeK7nd4DvcK0Eu@cluster0.iqfcv.mongodb.net/moviebox?retryWrites=true&w=majority&appName=Cluster0'


const app = express();
app.use(express.json());
app.use(movieRoutes);

mongoose
    .connect(URL_2, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Connected to Mongo DB'))
    .catch((err)=>console.log(`DB connection error: ${err}`))

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`server startered in http://localhost:${PORT}`);    
});










