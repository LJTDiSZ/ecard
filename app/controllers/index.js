//Index controller
var formidable = require('formidable')
var util = require('util');
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

exports.postindex = function(req, res){
	console.log('User in sesion:');
	console.log(req.session.user);

	res.render('index', {
		title: '首页',
		tmplogo: req.body.tmplogo
	});
}

exports.logoupload = function(req, res){
	console.log('User in sesion:');
	console.log(req.session.user);

	if (req.headers['content-type'].indexOf('multipart/form-data') >= 0) {
    	var formStream = new formidable.IncomingForm();
    	formStream.uploadDir = 'public/tmp';
      	formStream.keepExtensions = true;
    	formStream.parse(req, function(err, fields, files) {
	        //console.log(files.file.path);
	        //console.log(files.file.name);

	        if (err) {
	            res.locals.error = err;
	            console.log(err);
	            //res.render('index', { title: TITLE });
	            return;
	        }

	        res.writeHead(200, {"Content-Type": "application/json"});
	        if (err) {
	            res.write('{"success": false}');
	        } else {
	            // console.log(util.inspect({files: files}));
	            //console.log(files.file.path.substring(7));
	            res.write('{"success": true, "tmpname":"' + files.file.path.substring(7) + '"}');
	        }
	        res.end();
    	});
  	}
}