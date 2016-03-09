//User controllers
var User = require('../models/user')
var moment = require('moment')


//lognow(msg) - console.log the timestamp & msg
function lognow (msg) {
	if (msg) return console.log(moment(Date.now()).format('YYYY/MM/DD HH:MM:SS') + ' ' + msg)
	return console.log(moment(Date.now()).format('YYYY/MM/DD HH:MM:SS'))
}


//showSignup
exports.showSignup = function (req, res) {

	lognow()

	res.render('signup', {
		title: '注册'
	})
}


//showLogin
exports.showLogin = function (req, res) {

	lognow()

	res.render('login', {
		title: '登录'
	})
}


//signup
exports.signup = function (req, res) {
	var _user = req.body.user

	lognow()

	if (_user === undefined) {
		return res.redirect('/')
	}
		
	//User validation
	User.findOne({name: _user.name}, function (err, user) {
		if (err) {
			console.log(err)
		} 

		console.log(user)

		if (user) {
			console.log('user exists, redirect to login.')
			return res.redirect('/user/login')
		}
		else {

			var user = new User(_user)

			user.save(function (err, user) {
				if (err) {
					console.log(err)
				} 
				else {
					lognow('saved user: ' + user)

					res.redirect('/')
				}
			})
		}
	})
}



//login
exports.login = function (req, res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	lognow()

	console.log(_user)
	console.log(name)
	console.log(password)

	User.findOne({name: name}, function (err, user) {
		if (err) {
			console.log(err)
		}

		if (!user) {
			return res.redirect('/user/signup')
		}
		
		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				console.log(err)
			}

			if (isMatch) {
				console.log('Password is matched.')
				req.session.user = user
				return res.redirect('/')
			}
			else {
				console.log('Password is not matched.')
				return res.redirect('/user/signin')
			}
		})
	})
}


//logout
exports.logout = function (req, res) {
	lognow()
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}

//admin userlist page
exports.list = function (req, res) {

	lognow()

	User.fetch(function (err, users) {
		if (err) {
			console.log(err)
		}

		res.render('userlist', {
			title: '用户信息列表',
			users: users
		})
	})
}

//User middlewares
//loginRequired
exports.loginRequired = function (req, res, next) {
	var user = req.session.user

	if (!user) {
		return res.redirect('/user/login')
	}

	next()
}


//adminRequired
//admin roles >= 100
exports.adminRequired = function (req, res, next) {
	var user = req.session.user

	if (user.role < 100) { //admin roles >= 100
		return res.redirect('/user/login')
	}

	next()
}


