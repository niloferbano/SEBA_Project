/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var configPassport = require('../config/passport');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var user = require("../controllers/UserController.js");
var trip = require("../controllers/AddTripController.js");
var chat = require("../controllers/ChatController")

// route for login action
//router.post('/login', auth.doLogin);

router.post('/signup', user.createTemp);
router.post('/signin', user.authenticate);
router.post('/email-verification', user.confirmTempUser);

router.post('/updateProfile', jwt({
  secret: configPassport.secret}),
  user.onUpdateProfile);

router.post('/reset-password', user.resetPassword);
router.post('/reset-password-change', user.resetPasswordChange);


////////////////


router.get('/chat:room',chat.getAll);

/* SAVE CHAT */

router.post('/save-chat',chat.addMessage);

// router.post('/uploadImage',jwt({
//     secret: configPassport.secret}),
//   user.onUploadImage);
router.get('/getall', jwt({
  secret: configPassport.secret
}), user.getall);

router.post('/getProfile', jwt({
  secret: configPassport.secret
}), user.getProfile);

router.post('/addtrip', jwt({
  secret: configPassport.secret
}), trip.addtrip);

router.get('/searchtrips',jwt({
  secret: configPassport.secret
}), trip.searchtrips);

router.get('/mytrips',jwt({
  secret: configPassport.secret
}), trip.mytrips);

router.get('/trips-im-attending',jwt({
  secret: configPassport.secret
}), trip.tripsImAttending);


router.get('/', function (req, res, next) {
  res.send('Express REST API');
});

router.post('/uploadProfileImage', jwt({
  secret: configPassport.secret
}), user.uploadProfileImage);

router.post('/jointrip', jwt({
  secret: configPassport.secret
}), trip.joinTrip);

module.exports = router;
