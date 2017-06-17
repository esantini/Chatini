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


import { MyRequest } from "./modules/users/server/controllers/user.server.ctrlr.main";
import * as languages from "./modules/core/server/server.languages";
app.use('/', function(req: MyRequest, res: express.Response, next: express.NextFunction) {
	var lang = languages.getLanguage(req);
	res.render('index', { title: 'Chatini', language: lang });
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



import * as httpLib from 'http';
/**
 * Create HTTP server.
 */
var server = httpLib.createServer(app);

import { initialize as socketsInitianize } from "./modules/chat/server/services/chat.server.sockets";
socketsInitianize(server);

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