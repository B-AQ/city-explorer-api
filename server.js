'use strict';
// http://localhost:8541/weather?searchQuery=amman
require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors');
const axios = require('axios');
const app = express(); // initialize your express app instance
const weatherData = require('./data/weather.json');
const Forecast = require('./models/Forecast');
const Movie = require('./models/Movie');
const PORT = process.env.PORT;

const weatherBit_Key = process.env.WEATHERBIT_KEY;
const weatherBit_Url = process.env.WEATHERBIT_URL;
const movieDB_Url = process.env.MOVIEDB_URL;
const movieDB_Key = process.env.MOVIEDB_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/weather', (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const searchQuery = req.query.searchQuery;

  // console.log(lat);
  // console.log(searchQuery);

  try {
    let cityNewArray = weatherData.find((element) => {
      if (element.city_name === searchQuery) {
        return element.city_name;
      }

    });
    class Forecast {
      constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
      }
    }
    console.log(cityNewArray);
    // res.status(200).send(cityNewArray);
    let weatherCity =cityNewArray.data.map(element=>{
      return new Forecast({datetime:element.datetime, description:`Low of ${element.low_temp}, high of ${element.high_temp} with ${element.weather.description}`});

    });

    res.send(weatherCity);

  } catch (e) {
    res.status(404).send('Page is not found 404');
  }
});

//-----------------------Weather---------------------------------//



app.get('/weather-bit',async (req,res) =>{
  const {latitude,longitude} = req.query;
  const queryParams={
    params:{
      key:weatherBit_Key,
      lat:latitude,
      lon:longitude,
    }
  };

  const response = await axios.get(weatherBit_Url,queryParams);
  const WeatherBitData = response.data.data.map(item => new Forecast(item));
  res.json(WeatherBitData);

});

//-------------------Moive-------------------------------------//


let myMemory = {};
app.get('/movie', async (req,res) =>{
  let searchQuery = req.query.searchQuery;
  if (myMemory[searchQuery] !== undefined) {

    res.send(myMemory[searchQuery]);
  } else {

    const url =`${movieDB_Url}?api_key=${movieDB_Key}&query=${searchQuery}`;
    const gettingMovie =await axios.get(url);
    console.log(gettingMovie);

    const moviesArray=gettingMovie.data.results.map(item=>new Movie(item));
    console.log(gettingMovie.data.results);
    res.json(moviesArray);
  }

});


app.listen(PORT, () => {
  console.log(PORT);
});


