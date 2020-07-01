const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Express config setting
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3000;
// Views setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Static folder setup
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mukesh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'I am Mukesh, how may I help you?',
        name: 'Mukesh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mukesh'
    });
});

app.get('/weather', (req, res) => {
    const {address} = req.query;
    
    if (!address) {
        return res.send({
            error: 'Please provide a location.'
        });
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            //console.log(forcastData);
            res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Mukesh'
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found.',
        title:'404',
        name: 'Mukesh'
    });
});

app.listen(port, () => {
    console.log('Express server is up and running on port ' + port);
});