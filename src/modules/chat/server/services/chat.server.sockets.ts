import * as socketio from 'socket.io';
import * as conversationsCtrlr from "../controllers/chat.server.ctrlr.conver";
import { Server } from "http";
var socketioJwt = require('socketio-jwt');

var io: SocketIO.Server;

export interface mySocketMessage {
	message: string,
	from: string,
	date?: Date,
	converId: string
}

export const register = 
	function(socket: SocketIO.Socket, converId: string) {
		socket.join(converId);
	}

export const disconnect = 
	function(socket: SocketIO.Socket, converId: string) {
		socket.leave(converId);
	}

export const initialize = function(server: Server){
	
	/**
	 * Listen on provided port, on all network interfaces.
	 */
	io = socketio(server);
	var connections: SocketIO.Socket[] = [];
	interface MySecureSocket extends SocketIO.Socket {
		decoded_token: { _id: string }
	}

	io.on('connection', 
			socketioJwt.authorize({
				// If you are using a base64-encoded secret (e.g. your Auth0 secret key), you need to convert it to a Buffer: Buffer('your secret key', 'base64')
				secret: "MY_SECRET", // TODO get from env variable
				timeout: 15000 // 15 seconds to send the authentication message
			})
		)
		.on('authenticated', function(socket: MySecureSocket) {
			socket.emit('connected');
			
			var thisUserId = socket.decoded_token._id;

			if(connections.indexOf(socket) < 0) {
				connections.push(socket);
				console.log('Users connected to socket: ', connections.length);
			}

			conversationsCtrlr.registerSocket(thisUserId, socket);

			socket.on('chat message', 
				function (message: mySocketMessage) {
					message.date = new Date();
					conversationsCtrlr.newMessage(message);
					io.in(message.converId).emit('chat message', message);
				});

			socket.on('disconnect', function() {
				console.log('User disconected');

				var i = connections.indexOf(socket);
				connections.splice(i, 1);
			});
			
		});
}