var express = require('express');
var router = express.Router();
var home = require('../models/home_model.js');
var book = require('../models/book_model.js');

router.get('/', (req, res) => {
    console.log('homeRouter -- router.get');
    console.log(req.query.idmember);
    book.getByMember( req.query.idmember, (err, dbResult) => {
        err ? res.json(err) : res.render('home', { books: dbResult});
    } )
    
});

module.exports = router;
