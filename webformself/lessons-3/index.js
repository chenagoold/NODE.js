const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.requests.js') 

//c789a8de97310445a9cd749db08dac2e

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req,res) => {
    //res.end('Hello World')
    res.render('index', {weather: null, error: null})
});

app.post('/', async(req,res) => {
    const {city} = req.body

    const {weather, error} = await weatherRequest(city)
    //console.log('Weather', weather)
    //console.log('Error', error)
    //console.log(city)  
    res.render('index', {weather, error})

});

app.listen(3000, () => {
              console.log('Server has started on port 3000...')

});
