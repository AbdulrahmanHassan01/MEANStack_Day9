const express = require('express');
const server = express();

var mongoose = require('mongoose');
var ShowCollection = require('./models/show');
var Show = require('./models/show');

mongoose.connect(`mongodb+srv://AbdulrahmanHassan:gaH1vND9IYvxk4xR@cluster0.rk9et.mongodb.net/tvshows?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=> {console.log('Connected to MongoDB...');
    })
    .catch((err)=> {console.error('Could not connect to MongoDB...')
});

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.post('/addshow', (req, res) => {
    var data = req.body;
    var newShow = new Show({
        adult: data.adult,
        backdrop_path: data.backdrop_path,
        genre_ids: data.genre_ids,
        id: data.id,
        origin_country: data.origin_country,
        original_language: data.original_language,
        original_name: data.original_name,
        overview: data.overview,
        popularity: data.popularity,
        poster_path: data.poster_path,
        first_air_date: data.first_air_date,
        name: data.name,
        vote_average: data.vote_average,
        vote_count: data.vote_count
    });
    try {
        newShow.save().then(() => {
            console.log('Show added successfully');
            res.send('Show added successfully');
        })
    } catch (error) {
        console.log('An error occurred');
        res.send('An error occurred');   
    }
});

server.get('/getshow/:id', (req, res) => {
    var showId = +req.params.id;
    Show.findOne({ id: showId }).then((show) => {
        if (show) {
            res.send(show);
        } else {
            res.send('Show not found');
        }
    }).catch((err) => {
        console.log('An error occurred');
        res.send('An error occurred');
    });
});

// get all shows
server.get('/allshows', (req, res) => {
    Show.find().then((shows) => {
        if (shows.length === 0) {
            res.send('No shows found');
        }
        res.send(shows);
    }).catch((err) => {
        console.log('An error occurred');
        res.send('An error occurred');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});