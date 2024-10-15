const express = require('express');
const { connectToDb, getDb } = require('./db');

const PORT = 3000;

const app = express();

let db;

connectToDb((err)=>{ 
    if(!err){
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`server startered in http://localhost:${PORT}`);    
        });

        db = getDb();
    }else{
        console.log(`DB connection error: ${err}`);
        
    }
});

app.get('/movies',(req, res)=>{
    const movies = []
    db
        .collection('movies')
        .find()// cursor - hasNext, next, 
        .sort({ title: 1 })
        .forEach((movie) => {
            movies.push(movie)
        })
        .then(()=>{
            res
                .status(200)
                .json(movies);
        })
        .catch(()=>{
            res
                .status(500)
                .json({error:"Someting goes wrong..."});
        })

})





