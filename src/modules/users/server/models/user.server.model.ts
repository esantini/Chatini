
import { Document, Schema, Model, model } from 'mongoose';
import * as crypto from 'crypto';
import * as JWT from 'jsonwebtoken';

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property: string) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email: string) {
	return ((this.provider !== 'local' && !this.updated) || emailRegex.test(email));
};

export interface MyUser extends Document {
	email: string;
	name: string;

	authenticate(password: string): boolean;
	setPassword(password: string): void;
	validPassword(password: string): boolean;
	generateJwt(): string;
}

/**
 * User Schema
 */
var UserSchema: Schema = new Schema({
	name: {
		type: String,
		trim: true,
		default: '',
		required: true
		// validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
		// validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		default: '',
		required: true
		// validate: [validateLocalStrategyEmail, "Please fill a valid email address"]
	},
	username: {
		type: String,
		unique: "Username already exists",
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		default: ''
	},

	hash: String,
	salt: String
});


//TODO needed?
UserSchema.methods.authenticate = function(password: string) {
	return this.password === this.hashPassword(password);
}



var digest = 'sha512'; //https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest

UserSchema.methods.setPassword = function(password: string) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, digest).toString('hex');
}

UserSchema.methods.validPassword = function(password: string) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, digest);
	return this.hash === hash;
}

UserSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return JWT.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: expiry.getTime() / 1000,

	}, "MY_SECRET"); //TODO set secret in environment variable.
}

export const User: Model<MyUser> = model<MyUser>("User", UserSchema);
