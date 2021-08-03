'use strict';
// http://localhost:3030/weather
const express = require('express'); // require the express package
const cors = require('cors');
const app = express(); // initialize your express app instance
require('dotenv').config();
const PORT = process.env.PORT;
const weatherData = require('./data/weather.json');

app.use(cors());
app.use(express.json());

app.get('/weather', (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const searchQuery = req.query.searchQuery;

  console.log(lat);
  console.log(lon);

  try {
    let newArray = weatherData.find((item) => {
      return item.city_name.toLowerCase() === searchQuery.toLowerCase();
    });

    class Forecast {
      constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
      }
    }

    let array = [];
    weatherData.data.map((item) => {
      array.push(
        new Forecast(
          item.datetime,
          `Low of ${item.low_temp}, High of ${item.max_temp},${item.weather.description}`
        )
      );
    });

    res.send(newArray);
  } catch (e) {
    res.status(404).send('Page is not found 404');
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
