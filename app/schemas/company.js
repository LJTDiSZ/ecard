//company.js
//Created: 3/8/2016
//Company account. Parent link.
//ToDo:


var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var CompanySchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
	role: {
		type: Number,
		default: 0
	},
	cname: String,
	ename: String,
	tel: String,
	fax: String,
	address: String,
	website: String,

	parent: {
		type: Schema.Types.ObjectId,
		default: null
	},

	members: [Schema.Types.ObjectId],

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

CompanySchema.pre('save', function (next) {
	var user = this

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err)

			user.password = hash

			//console.log('UserSchema.pre save: user = ' + user)

			next()
		})
	})
})


CompanySchema.methods = {
	comparePassword: function (_password, cb) {
		bcrypt.compare(_password, this.password, function (err, isMatch) {
			if (err) return cb(err)

			cb(null, isMatch)

		})
	}
}

CompanySchema.statics = {
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

module.exports = UserSchema

