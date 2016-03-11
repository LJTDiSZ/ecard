//card.js
//namecard schema
//Store namecard data

'use strict'

var mongoose = require('mongoose')

var CardSchema = new mongoose.Schema({
	cname: String,
	ename: String,
	ctitle: String,
	etitle: String,
	tel: String,
	mobile: String,
	email: String,
	QRCode: String,
	photo: String,//TBD

	ccompany: String,
	ecompany: String,
	logo: String, //TBD
	caddress: String,
	eaddress: String,
	website: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

CardSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next()
})

CardSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function (id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = CardSchema

