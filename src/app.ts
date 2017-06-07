import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';


// Bring in the data model
import './modules/core/server/db';
// Bring in the Passport config after model is defined
import './modules/users/server/config/strategies/local';

var app = express();

// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Initialise Passport before using the route middleware
app.use(passport.initialize());

import routesApi = require('./routes.index');
app.use('/api', routesApi);

app.use('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
	res.render('index', { title: 'Chatini' });
});



interface myError extends Error {
	status?: any;
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err:myError = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err: myError, req:express.Request, res:express.Response, next: express.NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});




// for sockets.io
import * as httpLib from 'http';
import * as socketio from 'socket.io';
import { newMessage } from "./modules/chat/server/controllers/chat.server.ctrlr.conver";
var socketioJwt = require('socketio-jwt');

/**
 * Create HTTP server.
 */
var server = httpLib.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
var io = socketio(server);
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

		socket.on('chat message', 
			function (message: any) {
				newMessage(message, socket, thisUserId);
			});

		socket.on('disconnect', function() {
			console.log('User disconected');

			var i = connections.indexOf(socket);
			connections.splice(i, 1);
		});
		
	});


server.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
server.on('error', onError);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
		// named pipe
		return val;
	}
	if (port >= 0) {
		// port number
		return port;
	}
	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

export = app;