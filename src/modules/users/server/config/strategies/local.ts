
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as mongoose from 'mongoose';
import { MyUser } from "../../models/user.server.model";

var User = mongoose.model('User');

export = (function() {

	passport.use(new LocalStrategy({
			usernameField: 'email'
		},
		function( username, password, done) {
			User.findOne( {
				username: username.toLowerCase(),

			}, function(err, user: MyUser){
				
				if(err) { return done (err); }

				if(!user || !user.validPassword(password)) {
					return done(null, false, {
						message: 'Invalid username or password'
					});
				}

				// If credentials are correct:
				return done(null, user);
			})
		}
	));

})();