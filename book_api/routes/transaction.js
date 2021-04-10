const express = require('express');
const router = express.Router();
const transaction = require('../models/transaction_model.js');

router.get('/members', (req, res) => transaction.getmembers(
    (err, dbResult) => err ? res.json(err) : res.json(dbResult) 
));

router.get('/:id?', (req, res) => {
    if (!req.params.id) {
        transaction.getAll( (err, dbResult) => err ? res.json(err) : res.json(dbResult) );
    } else {
        transaction.getById( req.params.id, (err, dbResult) => err ? res.json(err) : res.json(dbResult[0]) );
    }
});


router.post('/', (req, res) => transaction.add(
    req.body, (err, dbResult) => {
        if (err) {
            res.json(err);
        } else {
            if (dbResult.insertId === 0) {
                res.send('Duplicated record. Nothing added.')
            } else {
                res.json(dbResult);
            }
        }
    }
) );

router.put('/:id', (req, res) => transaction.update(
    req.params.id, req.body, (err, dbResult) => err ? res.json(err) : res.json(dbResult) ) 
);

router.delete('/:id', (req, res) => transaction.delete(
    req.params.id, (err, dbResult) => err ? res.json(err) : res.send(`${dbResult.affectedRows} row(s) deleted.`) ) 
);

module.exports = router;