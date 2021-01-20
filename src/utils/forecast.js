const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/forecast?access_key=965cb05a523b5fb1adc7de8ed966686a&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to the weather services', undefined)
        }else if(body.error){
            callback('Unable to find the location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees celcius out. There is ' + body.current.precip + ' chance of rainfall.' + '\nLast checked:  '+ body.current.observation_time)        }
        })
}

module.exports = forecast