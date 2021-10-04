const express = require('express')
const https = require('https')
const bodyParser=require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/', (req, res) => {
  res.render('index', {data: ''});
})

app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : "Purnia";
  const appId = "daefa7a97c515435fa654f3a0ca2918f";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + appId + "&units=metric";
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        res.render('index', {data: weatherData});
      })
    } else {
      res.render('index', {data: "0"})
    }
  })
})

app.listen(3000);
