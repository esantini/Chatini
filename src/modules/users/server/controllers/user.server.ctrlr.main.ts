import * as mongoose from 'mongoose';
import * as express from 'express';
import { MyUser } from "../models/user.server.model";
var User = mongoose.model('User');

interface MyRequest extends express.Request {
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
	console.log('thisuser', req.thisUser.name, req.thisUser._id);
	User.find(
		{ 
			"name": { "$regex": query, '$options': 'i' },
			"$nin": {
				"_id": req.thisUser._id
			}
		},
		function(err, docs: mongoose.Document[]) {
			
			res.status(200).json(docs);

		}
	);
}