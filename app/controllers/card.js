//Card controllers
var Card = require('../models/card')
var _ = require('underscore')
var moment = require('moment')


//lognow(msg) - console.log the timestamp & msg
function lognow (msg) {
	if (msg) return console.log(moment(Date.now()).format('YYYY/MM/DD HH:MM:SS') + ' ' + msg)
	return console.log(moment(Date.now()).format('YYYY/MM/DD HH:MM:SS'))
}

//card detail
exports.detail = function (req, res) {
	var id = req.params.id

	lognow('card detail id: ' + id)

	Card.findById(id, function (err, card) {
		if (err) {
			console.log(err)
			res.redirect('/')
		} else {
			res.render('detail', {
				title: '名片信息',
				card: card
			})
		}
	})
}


//new card
exports.new = function (req, res) {

	lognow()

	res.render('newcard', {
		title: '名片信息录入',
		card: {
			cname: '',
			ename: '',
			ctitle: '',
			etitle: '',
			tel: '',
			mobile: '',
			email: '',
			ccompany: '',
			ecompany: '',
			caddress: '',
			eaddress: '',
			website: ''
		}
	})
}


//update card
exports.update = function (req, res) {
	var id = req.params.id

	lognow()

	if (id) {
		Card.findById(id, function (err, card) {
			if (err) {
				console.log(err)
			}

			res.render('newcard', {
				title: '名片信息更新',
				card: card
			})
		})
	}
}


//save card
exports.save = function (req, res) {
	var id = req.body.card._id
	var cardObj = req.body.card
	var _card

	lognow()

	if (id !== 'undefined') {
		Card.findById(id, function (err, card) {
			if (err) {
				console.log(err)
			}

			_card = _.extend(card, cardObj)
			_card.save(function (err, card){
				if (err) {
					console.log(err)
				}

				res.redirect('/card/' + card._id)
			})
		})
	} else {
		_card = new Card({
			cname: cardObj.cname,
			ename: cardObj.ename,
			ctitle: cardObj.ctitle,
			etitle: cardObj.etitle,
			tel: cardObj.tel,
			mobile: cardObj.mobile,
			email: cardObj.email,
			ccompany: cardObj.ccompany,
			ecompany: cardObj.ecompany,
			caddress: cardObj.caddress,
			eaddress: cardObj.eaddress,
			website: cardObj.website
		})

		_card.save(function (err, card) {
			if (err) {
				console.log(err)
			}

			res.redirect('/card/' + card._id)
		})
	}
}


//admin card list
exports.list = function (req, res) {

	lognow()

	Card.fetch(function (err, cards) {
		if (err) {
			console.log(err)
		}

		//console.log('GET /admin/list: ' + cards)
		res.render('list', {
			title: '名片信息列表',
			cards:cards
		})
	})
}


//admin/list delete item
exports.delete = function (req, res) {
	var id = req.query.id

	lognow()

	if (id) {
		Card.remove({_id: id}, function (err, card) {
			if (err) {
				console.log(err)
			} else {
				//lognow('namecard removed id:' + id)
				res.json({success: 1}) //return to client {success: 1}
			}
		})
	}
}



//bbily