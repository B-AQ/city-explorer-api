'use strict';
// http://localhost:8081/weather?searchQuery=amman
require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors');
const app = express(); // initialize your express app instance
const PORT = process.env.PORT;
const weatherData = require('./data/weather.json');
const response = express();

response.use(cors());
response.use(express.json());

app.get('/weather', (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const searchQuery = req.query.searchQuery;

  // console.log(lat);
  // console.log(searchQuery);

  // try {
  let cityNewArray = weatherData.find((element) => {
    if (element.city_name === searchQuery) {
      return element.city_name;
    }else{}

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

  // } catch (e) {
  // res.status(404).send('Page is not found 404');
  // }
});

app.listen(PORT, () => {
  console.log(PORT);
});
