// const { response } = require('express');
const express = require('express'); // require the express package
const cors = require('cors');
const app = express(); // initialize your express app instance
require('dotenv').config();
const PORT = process.env.PORT;
const weatherData = require('./data/weather.json');


// const dotenv = require('dotenv');
// a server endpoint
// app.get('/',
// // our endpoint name
//   function (req, res) { // callback function of what we should do with our request
//     res.send('Hello World'); // our endpoint function response
//   });

app.use(cors());
app.use(express.json());

app.get('/weather',(req,res)=>{

  const lon = req.query.lon;
  const lat = req.query.lat;
  const query = req.query.city_name;
  console.log(lat);
  console.log(lon);

  //   res.json(weatherData);

  const newArray = weatherData.find(item=>{
    return item.city_name === query;
  });
  res.json(newArray);
  console.log(newArray);

});

class Forecast {

  constructor(datetime,description){
    this.date = datetime;
    this.description = description;
  }
}
console.log(Forecast);

app.get('*', (req, res) => {
  res.status(404).send('Page is not found');
});


app.listen(PORT, () => {
  console.log(PORT);
});
