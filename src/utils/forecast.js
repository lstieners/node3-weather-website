const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f2dd3d76daa05e3eb9894425f7188a52&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback({error: 'unable to connect to weather services'}, undefined)
        } else if (body.error) {
            callback({error: 'Unable to find location'}, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees")
        }
    })
}

module.exports = forecast