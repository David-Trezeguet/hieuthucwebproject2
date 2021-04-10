var express = require('express');
var router = express.Router();
var book = require('../models/book_model.js');

router.get('/', (req, res) => {
    console.log('req.query.idbook:', req.query.idbook);
    book.getByIdbook( req.query.idbook, (err, dbResult) => {
        if (err) {
            res.json(err);
        } else {
            if (dbResult.length > 0) {
                // res.json(dbResult[0]);
                res.render('book_detail', { book: dbResult[0]});
            } else {
                res.json( {success: false, message: 'There is no book with that id.'} );
            }
        }
const express = require('express');
const router = express.Router();
const book = require('../models/book_model');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    book.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  } else {
    book.getAll(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});


router.post('/', 
function(request, response) {
  book.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});

router.post('/upload', (req, res) => {
    console.log('req.body.idmember', req.body.idmember);
    book.getByIdmember( req.body.idmember, (err, dbResult) => {
        err ? res.json(err) : res.render('book_upload');
    } )
    

router.delete('/:id', 
function(request, response) {
  book.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});


router.put('/:id', 
function(request, response) {
  book.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;