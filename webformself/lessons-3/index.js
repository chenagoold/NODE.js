const express = require('express')
const lm = require('lmclient')
const app = express()
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.requests.js')
var client = new lm.LMClient({
        host:       '127.0.0.1',                // адрес сервера
        port:       3000,                       // порт сервера
        login:      'login1',                   // логин
        password:   'password',                 // пароль
        reconnect:  true,                       // автоматически переподключаться при ошибках и разрывах связи
        opros:      false,                      // тип учетной записи "опрос"
        client:     true                        // тип учетной записи "клиент"
}); 

//c789a8de97310445a9cd749db08dac2e

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

client.on('connecting', function(host, port){
    console.log('connecting to ' + host + ':' + port);
});

client.on('connect', function(){
    console.log('connected');
});
client.connect();

//app.get('/about',(req,res) =>{
 //   const {host,port} =  

//})



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
