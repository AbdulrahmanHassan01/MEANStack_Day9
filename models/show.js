var mongoose = require('mongoose');
let showSchema = mongoose.Schema(
  {
    adult: Boolean,
    backdrop_path: String,
    genre_ids: [Number],
    id: {
      type: Number,
      unique: true
    },
    origin_country: [String],
    original_language: String,
    original_name: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    first_air_date: Date,
    name: String,
    vote_average: Number,
    vote_count: Number
  }
);
var Show = mongoose.model('Show', showSchema);
module.exports = mongoose.model('Show', showSchema);
module.exports = Show;