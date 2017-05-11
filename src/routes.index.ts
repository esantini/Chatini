
import * as express from 'express';

import * as expJwt from 'express-jwt';

var auth = expJwt({
	secret: "MY_SECRET", // TODO get from env variable
	userProperty: "payload"
});

import * as ctrlrProfile from './modules/users/server/controllers/user.server.ctrlr.profile';
import * as ctrlrAuth from './modules/users/server/controllers/user.server.ctrlr.auth';

var router = express.Router();

router.get('/profile', auth, ctrlrProfile.profileRead);

// authentication
router.post('/register', ctrlrAuth.register);
router.post('/login', ctrlrAuth.login);


export = router;
