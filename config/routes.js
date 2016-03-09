//config/routes.js
//Author: Jimmy Li
//(c) 2016 all rights reserved.

'use strict'

var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Card = require('../app/controllers/card')


module.exports = function (app) {
	//pre-handler app.locals.user
	app.use(function (req, res, next) {
		var _user = req.session.user

		app.locals.user = _user

		next()
	})

	//Index
	app.get('/', Index.index)

	//User
	app.post('/user/signup', User.signup)
	app.post('/user/login', User.login)
	app.get('/user/signup', User.showSignup)
	app.get('/user/login', User.showLogin)
	app.get('/user/logout', User.logout)
	app.get('/admin/user/list', User.loginRequired, User.adminRequired, User.list)


	//Card
	app.get('/card/:id', User.loginRequired, Card.detail)
	app.get('/new/card', User.loginRequired, Card.new)
	app.get('/card/update/:id', User.loginRequired, Card.update)
	app.post('/card/save', User.loginRequired, Card.save)
	app.get('/admin/card/list', User.loginRequired, User.adminRequired, Card.list)
	app.delete('/admin/card/list', User.loginRequired, User.adminRequired, Card.delete)
}


//bbily