
import { Document, Schema, Model, model } from 'mongoose';
import { MyUser } from "../../../users/server/models/user.server.model";

export interface Conversation extends Document {
	category: string,
	status: string,
	members: string[], // The user IDs (email)
	messages: Message[]
}

export interface Message extends Document {
	from: string, // 
	message: string | Drawing,
	date: Date
}

interface Drawing {}

var MessageSchema: Schema = new Schema({
	from: { type: Number, ref: 'User' },
	message: String,
	date: Date
});

var ConversationSchema: Schema = new Schema({
	category: {
		type: String, // 'friend', 'group'
		trim: true,
		default: 'user',
		required: true
	},
	status: String, // 'live', 'requested'
	created: Date,
	creator: { type: Number, ref: 'User' },
	members: [{ type: Number, ref: 'User' }],
	messages: {
		type: [MessageSchema],
		default: [],
		required: true
	}
});

export
	const Conversation: Model<Conversation> = 
	model<Conversation>("Conversation", ConversationSchema);

export 
	const Message: Model<Message> =
	model<Message>("Message", MessageSchema);