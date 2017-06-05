import * as mongoose from 'mongoose';
import * as express from 'express';
import { MyUser } from "../models/user.server.model";
import { Conversation } from "../../../chat/server/models/chat.server.model";
var User = mongoose.model('User');
var Conver = mongoose.model('Conversation');

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
		function(err, docs: mongoose.Document[]) {
			res.status(200).json(docs);
		}
	);
}

export const friendRequest = function( req: MyRequest, res: express.Response) {

	var friendID: string;
	if(req.query && req.query.query) {
		friendID = JSON.parse(req.query.query)._id;
	}
	else { 
		res.status(500);
		res.send("Missing Friend's ID");
		return;
	}

	var query = {
		$and: [
				{ category: 'friend' },
				{ members: { $in: [req.thisUser._id, friendID] } }
			]
	};

	Conver.findOne(query, function(err: mongoose.Error, conver: Conversation) {
		if(!err) {
			if(!conver) {
				conver = new Conver() as Conversation;
				conver.status = 'pending';
				conver.creator = req.thisUser._id;
				conver.members.push(req.thisUser._id, friendID as any );
				conver.messages = [];
			}
			conver.save(function(err) {
				if(!err) {
					res.send('OK');
				}
				else {
					res.status(500);
					res.send( err.message );
				}
			});
		} else {
			res.status(500);
			res.send(err.message);
		}
	});
	
/*
	req.newData.username = req.user.username;
	Conver.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
		if (err) return res.send(500, { error: err });
		return res.send("succesfully saved");
	});
*/

}