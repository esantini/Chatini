import * as mongoose from 'mongoose';
import * as express from 'express';
var User = mongoose.model('User');

export const profileRead = function(req: any, res: express.Response) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};