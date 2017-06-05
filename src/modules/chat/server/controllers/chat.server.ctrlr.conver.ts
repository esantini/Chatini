import * as mongoose from 'mongoose';
import * as express from 'express';
import { Conversation } from "../../../chat/server/models/chat.server.model";
import { MyUser } from "../../../users/server/models/user.server.model";
var User = mongoose.model('User');
var Conver = mongoose.model('Conversation');

interface MyRequest extends express.Request {
	thisUser: MyUser
}

export const myConversations = function(req: MyRequest, res: express.Response) {
	Conver.find( { members: {$in: [ req.thisUser._id ] }},
		'_id name category members messages'
	).populate('members', '_id name' )
	.exec(
		function(err, docs: Conversation[]) {
			res.status(200);
			res.send(docs);
		});
}