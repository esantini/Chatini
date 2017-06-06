import * as mongoose from 'mongoose';
import * as express from 'express';
import { Conversation } from "../../../chat/server/models/chat.server.model";
import { MyUser } from "../../../users/server/models/user.server.model";
var Conver = mongoose.model('Conversation');

interface MyRequest extends express.Request {
	thisUser: MyUser
}

export const myConversations = function(req: MyRequest, res: express.Response) {
	Conver.find( { members: {$in: [ req.thisUser._id ] }},
		'_id name category members messages status creator' )
	.populate('members', '_id name' )
	.populate('creator', '_id name' )
	.exec(
		function(err, docs: Conversation[]) {
			res.status(200);
			res.send(docs);
		});
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
				{ members: req.thisUser._id },
				{ members: friendID }
			]
	};

	Conver.findOne(query, function(err: mongoose.Error, conver: Conversation) {
		if(!err) {
			if(!conver) {
				conver = new Conver() as Conversation;
				conver.status = 'pending';
				conver.creator = req.thisUser._id;
				conver.members.push( req.thisUser._id, friendID as any );
				conver.messages = [];
			}
			// TODO else { conversation already exists. }

			conver.save(function(err) {
				if(!err) {
					res.status(200);
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
}

export const newFriendAccepts = function(req: MyRequest, res: express.Response) {
	
	if(req.thisUser._id == req.headers.friend) {
		res.status(400);
		res.send("Cannot accept your own friend request.");
		return;
	}

	var query = {
		$and: [
				{ category: 'friend' },
				{ members: req.thisUser._id },
				{ members: req.headers.friend }
			]
	};
	
	Conver.findOne( query )
	.exec(
		function(err: mongoose.Error, docs: Conversation) {
			if(err) {
				res.status(500);
				res.send(err.message);
				return;
			}

			if( docs.creator.toString() == req.thisUser._id ) {
				res.status(400);
				res.send("Cannot accept your own request.");
				return;
			}

			docs.status = 'active';
			docs.save().then(function(){ // TODO error handling
				res.status(200);
				res.send('OK');
			});
		});
}