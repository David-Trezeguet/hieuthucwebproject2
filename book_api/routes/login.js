var express = require('express');
var router = express.Router();
var login = require('../models/login_model.js');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('', (req, res) => {
    login.get(req.body.emailaddress, req.body.password, (err, dbResult) => {
        if (err) {
            res.json(err);
        } else {
            if (dbResult.length > 0) {
                console.log(dbResult);
                // res.redirect('/home?idmember=' + dbResult[0].idmember);  //redirect on client side
                res.json(dbResult);
            } else {
                res.json( {success: false, message: 'Invalid email and/or password'});
            }
        }
    });
    
});

module.exports = router;
