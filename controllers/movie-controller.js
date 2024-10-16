const Movie =require('../models/movie');

const handleError = (res, error) => {
    res.status(500).json({ error });
}

// отримуємо всі фільми
const getMovies = (req, res) => {
    Movie
     .find()
     .sort({ title: 1 })
     .then((movies) => {
         res
             .status(200)
             .json(movies);
     })
     .catch((err)=> handleError = (res, err));
};

// отримуємо один фільм
const getMovie = (req, res) =>{
    Movie
        .findById(req.params.id) 
        .then((movie)=>{
            res
                .status(200)
                .json(movie);
        })
        .catch((err)=> handleError = (res, err));   
    }

// Видаляємо один фільм
const  deleteMovie = (req, res) => {
    Movie
     .findByIdAndDelete(req.params.id) 
     .then((result)=>{
         res
             .status(200)
             .json(result);
     })
     .catch((err)=> handleError = (res, err));
}

// Додавання одного фільма
const addMovie= (req, res) => {
    const movie = new Movie(req.body);
    movie
        .save()
        .then((result)=>{
            res
                .status(201)
                .json(result);
        })
        .catch((err)=> handleError = (res, err));
    }
    
// Оновлення 
const updateMovie = (req, res) => {
    Movie
     .findByIdAndUpdate((req.params.id), req.body) 
     .then((result)=>{
         res
             .status(200)
             .json(result);
     })
     .catch((err)=> handleError = (res, err));
}
module.exports = {
    getMovies,
    getMovie,
    deleteMovie,
    addMovie,
    updateMovie
};