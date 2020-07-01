var request = require('request');

var forecast = (lat, long, callback) => {
    let url = 'https://api.darksky.net/forecast/e4efe383e903feb4f75d00006d16cfed/' + lat + ',' + long + '?units=si';

    request({url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to weather service", undefined);
        } else if(response.body.error) {
            callback("Unable to find location", undefined);
        } else {
            const { currently, daily } = response.body;
            callback(undefined, 
                daily.data[0].summary + " It is currently " + currently.temperature+ " degrees celsius out. There is a " + currently.precipProbability + "% chance of rain."
            );
        }
    });
};

module.exports = forecast;