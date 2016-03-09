//Index controller
var Card = require('../models/card')

exports.index = function (req, res) {
	
	console.log('User in sesion:')
	console.log(req.session.user)


	Card.fetch(function (err, cards){
		if (err) {
			console.log(err)
		} else {
			res.render('index', {
				title: '首页',
				//cards: cards
			})
		}
	})
}
