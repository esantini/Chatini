import * as express from 'express';
import * as path from 'path';
import { MyRequest } from "../../users/server/controllers/user.server.ctrlr.main";
var locale = require('locale');

var supported = ['en', 'es', 'de'];

var supportedLocales = new locale.Locales(supported);

/**
 * Returns the best guess for the UI language, priorities are:
 * 	* if user is found: return req.thisUser.language
 *     * else if cookie is found: return req.cookies.language
 *     * lastly return best available from: req.headers["accept-language"]
 * @param req: MyRequest | express.Request
 */
export const getLanguage = function(req: MyRequest): string {
	
	if(req.thisUser) return req.thisUser.language;
	else if (req.cookies.language) return req.cookies.language;

	var preferred = req.headers["accept-language"];
	var locales = new locale.Locales(preferred);

	return locales.best(supportedLocales);
}

