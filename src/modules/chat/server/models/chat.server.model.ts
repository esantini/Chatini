
import { Document, Schema, Model, model } from 'mongoose';
import { MyUser } from "../../../users/server/models/user.server.model";
// import { ObjectID } from "@types/mongodb";

export interface Conversation extends Document {
	name: string,
	category: string,
	status: string,
	created: Date,
	creator: Schema.Types.ObjectId,
	members: Schema.Types.ObjectId[], // The user IDs (email)
	messages: Message[]
}

export interface Message extends Document {
	from?: string, // 
	message?: string | Drawing,
	date?: Date
}

interface Drawing {}

var MessageSchema: Schema = new Schema({
	from: { type: Schema.Types.ObjectId, ref: 'User' },
	message: String,
	date: Date
});

var ConversationSchema: Schema = new Schema({
	name: String,
	category: {
		type: String, // 'friend', 'group'
		trim: true,
		default: 'friend',
		required: true
	},
	status: String, // 'active', 'requested'
	created: Date,
	creator: { type: Schema.Types.ObjectId, ref: 'User' },
	members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	messages: {
		type: [MessageSchema],
		default: []
	}
});

export
	const Conversation: Model<Conversation> = 
	model<Conversation>("Conversation", ConversationSchema);

export 
	const Message: Model<Message> =
	model<Message>("Message", MessageSchema);