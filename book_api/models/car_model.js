const db = require('../database.js');

const car = {
    getAll: (callback) => db.query('select * from car order by idcar desc', callback),

    getById: (id, callback) => {
        if (id) {  // id: string
            db.query('select * from car where idcar=? order by idcar desc', [id], callback);
        }
    },

    add: (car, callback) => {
        if ( car && Object.keys(car).length > 0 ) {  // car: object
            db.query(
                'insert into car(brand, model, yearmodel) values(?,?,?)',
                [car.brand, car.model, car.yearmodel],
                callback
            );
        } else {
            console.log("\x1b[31m", 'ERROR: empty POST body!!!', "\x1b[0m");  // red color -> message -> reset color
            return;
        }
    },

    update: (id, car, callback) => {
        if ( car && Object.keys(car).length > 0 ) {
            db.query(
                'update car set brand=?, model=?, yearmodel=? where idcar=?',
                [car.brand, car.model, car.yearmodel, id],
                callback
            )
        } else {
            // console.log("\x1b[31m", 'ERROR: empty PUT body!!!', "\x1b[0m");  // red color -> message -> reset color
            throw new Error('Empty PUT body!');
            return;
        }
    },

    delete: (id, callback) => db.query('delete from car where idcar=?', [id], callback),

    searchByBrand: (value, callback) => {
        const likeString = `%${value}%`;
        db.query('select * from car where brand like ?', [likeString], callback)
    },

    searchByModel: (value, callback) => {
        const likeString = `%${value}%`;
        db.query('select * from car where model like ?', [likeString], callback)
    }
}

module.exports = car;