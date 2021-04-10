var express = require('express');
var router = express.Router();
var book = require('../models/book_model.js');
var member = require('../models/member_model.js');

router.get('/', (req, res) => {
    console.log(req.query.idmember);
    book.getByMember( req.query.idmember, (err, dbResult) => {
        err ? res.json(err) : res.render('home', { books: dbResult});
    } )
    
});

router.post('/add', (req, res) => {
    member.get( req.body.idowner, (err, dbResult) => {
        err ? res.json(err) : res.render('book_upload');
    } )
});

router.post('/login', (req, res) => {
    console.log(req.body.emailaddress, req.body.password);
    member.get(req.body.emailaddress, req.body.password, (err, dbResult) => {
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
