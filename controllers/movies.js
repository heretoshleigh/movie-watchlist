const Movie = require('../models/movie')
// const form = document.getElementById('form')

SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4d982ce8da366d91dc35465cb660e981&language=en-US&page=1&include_adult=false&query='

// All the different operations you can do in the movie list


module.exports = {
    getMovies: async (req, res) => {
        console.log(req.user)
        try {
            const movieItems = await Movie.find({ userId: req.user.id })
            const itemsLeft = await Movie.countDocuments({ userId: req.user.id, completed: false })
            res.render('movies.ejs', { movies: movieItems, left: itemsLeft, user: req.user })
        } catch (err) {
            console.log(err)
        }
    },

    // redirect to add movies page
    addMovie: async (req, res) => {
        try {
            await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&original_language=en&page=1&include_adult=false&query=${req.body.movieItem}`)
            .then((res) => res.json())
            .then(data => {console.log(data)})
            res.render('add-movie.ejs')
        }catch(err){ 
            console.log(err)
        }
    },

    // addMovie: async (req, res) => {
    //     try {
    //         await Movie.create({ movie: req.body.movieItem, completed: false, userId: req.user.id })
    //         console.log('Movie has been added!')
    //         res.redirect('/movies')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },


    // mark a movie as watched
    watched: async (req, res) => {
        try {
            await Movie.findOneAndUpdate({ _id: req.body.movieIdFromJSFile }, {
                completed: true
            })
            console.log('Mark Watched')
            res.json('Mark Watched')
        } catch (err) {
            console.log(err)
        }
    },
    // mark a movie as unwatched
    unwatched: async (req, res) => {
        try {
            await Movie.findOneAndUpdate({ _id: req.body.movieIdFromJSFile }, {
                completed: false
            })
            console.log('Marked Unwatched')
            res.json('Marked Unwatched')
        } catch (err) {
            console.log(err)
        }
    },
    // delete a movie on the list
    deleteMovie: async (req, res) => {
        console.log(req.body.movieIdFromJSFile)
        try {
            await Movie.findOneAndDelete({ _id: req.body.movieIdFromJSFile })
            console.log('Deleted Movie')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    }
}    