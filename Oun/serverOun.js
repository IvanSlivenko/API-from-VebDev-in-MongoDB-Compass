const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const PORT = 3000;

const app = express();
app.use(express.json());

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


const handleError = (res, error) => {
    res.status(500).json({ error });
}

// отримуємо всі фільми
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
        .catch(()=> handleError = (res, "Someting goes wrong..."));

});

// отримуємо один фільм
app.get('/movies/:id', (req, res)=>{
    if(ObjectId.isValid(req.params.id)){
        db
        .collection('movies')
        .findOne({ _id: new ObjectId(req.params.id) })// cursor - hasNext, next, 
        .then((doc)=>{
            res
                .status(200)
                .json(doc);
        })
        .catch(()=> handleError(res, "Someting goes wrong..."));

    }else{
        handleError(res, "Wrong id");
    }

    
});

// Видаляємо один фільм
app.delete('/movies/:id', (req, res)=>{
    if(ObjectId.isValid(req.params.id)){
        db
        .collection('movies')
        .deleteOne({ _id: new ObjectId(req.params.id) })// cursor - hasNext, next, 
        .then((result)=>{
            res
                .status(200)
                .json(result);
        })
        .catch(()=> handleError(res, "Someting goes wrong..."));

    }else{
        handleError(res, "Wrong id");
    }

    
});

// Додавання одного фільма
app.post('/movies', (req, res) => {
    db
        .collection('movies')
        .insertOne(req.body)// cursor - hasNext, next, 
        .then((result)=>{
            res
                .status(201)
                .json(result);
        })
        .catch(()=> handleError(res, "Someting goes wrong..."));

});

// Оновлення 

app.patch('/movies/:id',(req, res) => {
    if(ObjectId.isValid(req.params.id)){
        db
        .collection('movies')
        .updateOne({ _id: new ObjectId(req.params.id) },{$set: req.body})// cursor - hasNext, next, 
        .then((result)=>{
            res
                .status(200)
                .json(result);
        })
        .catch(()=> handleError(res, "Someting goes wrong..."));

    }else{
        handleError(res, "Wrong id");
    }
})





