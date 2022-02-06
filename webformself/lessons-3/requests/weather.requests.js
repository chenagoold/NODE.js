const rp = require('request-promise')
module.exports = async function(city){
if(!city){
	throw new Error('Имя города не может быть пустым')
	return
}
//console.log('City:', city)
const KEY = 'c789a8de97310445a9cd749db08dac2e'
const uri = 'https://api.openweathermap.org/data/2.5/weather'
const options = {
	uri,
	qs:{
		q: city,
		units: 'imperial',
		appid: KEY

	},

	json: true

}
try{
	const data = await rp(options)
	const celsius = (data.main.temp - 32) * 5/9
	//console.log(response)
	return {
		weather: `${data.name}: ${celsius.toFixed(0)}`,
		error: null
	}
}catch(error){
	return{
		weather: null,
		error: error.error.message 
	}
}
//const response = await rp(options)
//console.log(response)
}