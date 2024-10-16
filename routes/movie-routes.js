const express = require('express');
const mongoose = require('mongoose');
const { 
    getMovies, 
    getMovie, 
    deleteMovie, 
    addMovie, 
    updateMovie } = require('../controllers/movie-controller');


const router = express.Router();

// отримуємо всі фільми
router.get('/movies', getMovies);

// отримуємо один фільм
router.get('/movies/:id', getMovie);


// Видаляємо один фільм
router.delete('/movies/:id', deleteMovie);

// Додавання одного фільма
router.post('/movies', addMovie);

// Оновлення 
router.patch('/movies/:id', updateMovie);

module.exports = router;