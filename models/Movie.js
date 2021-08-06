
class Movie{
  constructor(data){
    this.title = data.title;
    this.overview = data.overview;
    this.vote_average = data.vote_average;
    // this.poster_path = data.poster_path;
    this.poster_path = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    this.popularity = data.popularity;
    this.released_on = data.release_date;

  }
}
module.exports = Movie;
