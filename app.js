//app.js
//enamecard application
//
//Author: Jimmy Li

'use strict'

var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
//var querystring = require('querystring')
var serveStatic = require('serve-static')
var session = require('express-session')
var logger = require('morgan')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
var moment = require('moment')
var routes = require('./config/routes')

var port = process.env.PORT || 3000
var dbURL = 'mongodb://localhost/cards'
var app = express()


app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.locals.moment = moment

//app.use(bodyParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) //extended to be false if use querystring

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

app.use(serveStatic(path.join(__dirname,'public')))

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'ecard@bbily',
	store: new mongoStore({
		url: dbURL,
		collection: 'sessions'
	})
}))

if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

app.listen(port)

mongoose.connect(dbURL)

routes(app) //start routes.js

console.log('http server started on port ' + port)
console.log('mongoose connect to ' + dbURL)



//bbily