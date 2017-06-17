import * as mongoose from 'mongoose';
import * as express from 'express';
import { MyUser } from "../models/user.server.model";
var User = mongoose.model('User');

export interface MyRequest extends express.Request {
	thisUser: MyUser
}

export const profileRead = function(req: MyRequest, res: express.Response) {

	if (!req.thisUser._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
	} else {
		User
			.findById(req.thisUser._id)
			.exec(function(err, user) {
				res.status(200).json(user);
			});
	}

};

export const userList = function(req: MyRequest, res: express.Response) {
	var query = req.query.query;
	User.find(
		{ 
			name: { $regex: query, $options: 'i' },
			_id: {
				$nin: {
					_id: [req.thisUser._id] // , contactsIds ]
				}
			}
		},
		'_id name',
		function(err, docs: MyUser[]) {
			res.status(200).json(docs);
		}
	);
}

export const changeLang = function(req: MyRequest, res: express.Response) {
	var newLanguage = req.query.query;

	User.findById(req.thisUser._id).then(
		function(doc: MyUser){
			doc.language = newLanguage;
			doc.save().then(function() {
				res.status(200);
				res.send('OK');
			},
			function(err: mongoose.Error) {
				res.status(500);
				res.send(err.message);
			});
		}, function(err: mongoose.Error) {
			res.status(500);
			res.send(err.message);
		}
	);

	res.status(200);
	res.send('OK');
}
