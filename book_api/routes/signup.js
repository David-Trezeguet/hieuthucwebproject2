var express = require('express');
var router = express.Router();
var signup = require('../models/signup_model.js');

// router.post('/add', (req, res) => {
//     signup.getByMember( req.body.idowner, (err, dbResult) => {
//         err ? res.json(err) : res.render('book_upload');
//     } )
// });

router.get('/', function(req, res, next) {
  res.render('signup');
});


module.exports = router;
