const request = require('request')


// Geocoding service
// User provides an address, we use geocoding api to convert it into latitude and longitude body

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFub2pidnMwMSIsImEiOiJja2p6cmtuOXMwYWMxMnF0ZzkzcWV2ZjJ3In0.86JJMxUfQRP7NsO70I0AAA'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services')    
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another.')
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
