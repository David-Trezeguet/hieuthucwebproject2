const express = require('express');
const router = express.Router();
const carowner = require('../models/carowner_model.js');

router.get('/cars', (req, res) => carowner.getCars(
    (err, dbResult) => err ? res.json(err) : res.json(dbResult) 
));

router.get('/:id?', (req, res) => {
    if (!req.params.id) {
        carowner.getAll( (err, dbResult) => err ? res.json(err) : res.json(dbResult) );
    } else {
        carowner.getById( req.params.id, (err, dbResult) => err ? res.json(err) : res.json(dbResult[0]) );
    }
});


router.post('/', (req, res) => carowner.add(
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

router.put('/:id', (req, res) => carowner.update(
    req.params.id, req.body, (err, dbResult) => err ? res.json(err) : res.json(dbResult) ) 
);

router.delete('/:id', (req, res) => carowner.delete(
    req.params.id, (err, dbResult) => err ? res.json(err) : res.send(`${dbResult.affectedRows} row(s) deleted.`) ) 
);

module.exports = router;