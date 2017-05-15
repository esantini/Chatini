
import * as express from 'express';

import * as passport from 'passport';
import * as mongoose from 'mongoose';
import { MyUser } from "../models/user.server.model";

var User = mongoose.model('User');

export const register = function(req: express.Request, res: express.Response) {
	
	var user = (new User() as MyUser);
	
	user.name = req.body.name;
	user.email = req.body.email;
	
	user.setPassword(req.body.password);

	user.save(function(err) {
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token" : token
		});
	});
	
	// console.log("registering user: " + req.body.email);
	// res.status(200);
	// res.json({
	// 	"message": "User registered: " + req.body.email
	// });
	
}

export const login = function (req: express.Request, res: express.Response, next: express.NextFunction) {
	
	passport.authenticate('local', function(err:string, user: MyUser, info: any) {
		var token;

		// If Passport throws/catches an error
		if (err) {
			res.status(404).json(err);
			return;
		}

		// If a user is found
		if(user){
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
			// If user is not found
			res.status(401).json(info);
		}

	})(req, res, next);
}