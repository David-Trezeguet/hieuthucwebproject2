var express = require('express');
var router = express.Router();
var book = require('../models/book_model.js');
var member = require('../models/member_model.js');

router.get('/', (req, res) => {
    console.log(req.query.idmember);
    book.getByIdmember( req.query.idmember, (err, dbResult) => {
        err ? res.json(err) : res.render('member', { books: dbResult});
    } )
    
});

router.post('/add', (req, res) => {
    console.log(req.body);
    member.add( req.body, (err, dbResult) => {
        if (err) {
            console.log(err);
            if (err.errno == 1062) {
                res.json( {success: false, message: 'This email address is not available. Please choose a different one.'} )
            } else {
                res.json( {success: false, message: 'Error occures. Please contact the website administrator.'} )
            }
        } else {
            res.json( {success: true, message: 'You have successfully registered. You can log in now.'} );
        }
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
                res.redirect('/member?idmember=' + dbResult[0].idmember);
                // res.json(dbResult);
            } else {
                res.json( {success: false, message: 'Invalid email and/or password'});
            }
        }
    });
    
});

module.exports = router;
