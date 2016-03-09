//carddesign.js
//namecard design schema

'use strict'

var mongoose = require('mongoose')

var CardDesignSchema = new mongoose.Schema({
	cardId: String,
	logo: {
		x: Number,
		y: Number,
		maxWidth: Number,
		maxHeight: Number
	},
	cname: {
		x: Number,
		y: Number,
		maxLength: Number,
		font: String,
		fontSize: Number
	},
	ename: String,
	ctitle: String,
	etitle: String,
	tel: String,
	mobile: String,
	email: String,
	ccompany: String,
	ecompany: String,
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

CardDesignSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next()
})

CardDesignSchema.statics = {
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

module.exports = CardDesignSchema

