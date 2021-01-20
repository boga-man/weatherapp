const path = require('path')  // it is a module that helps us to manipulate path strings
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// defining paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// setup handlebars engine and views location
app.set('view engine', 'hbs')  // this sets up hbs module to work along with express. It expects folder named 'views' to find its assets to be served
app.set('views', viewsPath) // this is how we customize the 'views' folder name and location

// setup static directory to serve
app.use( express.static(publicDirPath))  // this function can only serves the static files


app.get('', (req, res)=>{  // this function looks for 'views' folder in 'src' rather than the folder being served i.e. 'public'
    res.render('index', {
        title: 'Weather app',
        name: 'Manoj Boganadham'
    }) // render allows us to render our handlebars
})

app.get('/about', (req, res)=>{  // this function looks for 'views' folder in 'src' rather than the folder being served i.e. 'public'
    res.render('about', {
        title: 'About the app',
        name: 'Manoj Boganadham'
    }) // render allows us to render our handlebars
})
                                                                                    
app.get('/help', (req, res)=>{  // this function looks for 'views' folder in 'src' rather than the folder being served i.e. 'public'
    res.render('help', {
        helptext: 'This is the help text',
        title: 'Help',
        name: 'Manoj Boganadham'
    }) // render allows us to render our handlebars
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place}={})=>{  // default parameter syntax
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
            return res.send({
                forecast: forecastData,
                place,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: [],
    })
})


// error handling
// this should come only at the last
app.get('/help/*', (req, res)=>{
    res.render('error404', {
        title: 404,
        filler: "This page doesn't have any sub pages!"
    })
})

app.get('*', (req, res)=>{
    res.render('error404', {
        title: 404,
        filler: "This page doesn't exist. Try using ",
        link: '/',
        text: "this"
    })
})

// our website may have different routes
// app.com - domain
// app.com/help - route
// app.com/about - another route
// the first argument of the get function is the route 


// app.get('/about', (req, res)=>{
//     res.send('About page')
// }) 

// app.get('/help', (req, res)=>{
//     res.send('This is another page!')
// })

// app.get('/weather', (req, res)=>{
//     res.send('<h1>This page will show weather forecast in the future!</h1>')
// })


// to run the server on our system, we can use this
// app.listen(3000, ()=>{
//     console.log('Server fired up on port 3000...\n')
// })

app.listen(port, ()=>{
    console.log('Server fired up on port ' + port + '...\n')
})