const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serv
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help me',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send(error)
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: [
            
        ]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        error: 'Help article not found',
        name: 'Andrew'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        error: 'Page not found',
        name: 'Andrew'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})