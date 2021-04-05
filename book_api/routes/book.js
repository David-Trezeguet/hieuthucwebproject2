var express = require('express');
var router = express.Router();
var book = require('../models/book_model.js');

router.get('/:idbook', (req, res) => {
    book.get( req.params.idbook, (err, dbResult) => {
        if (err) {
            res.json(err);
        } else {
            if (dbResult.length > 0) {
                // res.json(dbResult[0]);
                res.render('book_detail', { book: dbResult[0]});
            } else {
                res.send('There is no book with that id.')
            }
        }
    });
});

router.post('/upload', (req, res) => {
    console.log('req.body.idmember', req.body.idmember);
    book.getByMember( req.body.idmember, (err, dbResult) => {
        err ? res.json(err) : res.render('book_upload');
    } )
    
});

router.post('/add', (req, res) => {
    book.add( req.body, (err, dbResult) => {
        err ? res.json(err) : res.send('Sucessfully uploaded.');
    } )
})

module.exports = router;
