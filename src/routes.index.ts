
import * as express from 'express';

import * as expJwt from 'express-jwt';

var auth = expJwt({
	secret: "MY_SECRET", // TODO get from env variable
	userProperty: "thisUser"
});

import * as ctrlrUser from './modules/users/server/controllers/user.server.ctrlr.main';
import * as ctrlrAuth from './modules/users/server/controllers/user.server.ctrlr.auth';

var router = express.Router();

router.get('/profile', auth, ctrlrUser.profileRead);
router.get('/userlist', auth, ctrlrUser.userList);
router.get('/friendrequest', auth, ctrlrUser.friendRequest);

// authentication
router.post('/register', ctrlrAuth.register);
router.post('/login', ctrlrAuth.login);


export = router;
