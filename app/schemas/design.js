//design.js
//namecard design schema
//Todo:

'use strict'

var mongoose = require('mongoose')

var DesignSchema = new mongoose.Schema({
	designId: String,
	top: {

		logo: {
			x: Number,
			y: Number,
			maxWidth: Number,
			maxHeight: Number
		},

		QRCode: {
			x: Number,
			y: Number,
			maxWidth: Number,
			maxHeight: Number
		},

		cName: {
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		},

		cMobile: {
			x: Number,
			y: Number,
			maxLength: Number,
			font: String,
			fontSize: Number
		},
		
		cTitle: {
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		},

		cCompany: {
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		},

		cText: {
			//Editable text box with default of:
			//tel: String,
			//mobile: String,
			//email: String,		
			//cAddress: String,
			//website: String
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		}
	},

	bottom: {

		logo: {
			x: Number,
			y: Number,
			maxWidth: Number,
			maxHeight: Number
		},

		QRCode: {
			x: Number,
			y: Number,
			maxWidth: Number,
			maxHeight: Number
		},

		eName: {
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		},
		
		eTitle: {
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		},

		eCompany: {
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		},

		eText: {
			//Editable text box with default of:
			//tel: String,
			//mobile: String,
			//email: String,		
			//cAddress: String,
			//website: String
			x: Number,
			y: Number,
			maxLength: Number,
			maxLines: Number,
			font: String,
			fontSize: Number
		}
	},

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

DesignSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next()
})

DesignSchema.statics = {
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

module.exports = DesignSchema

