const db = require('../database.js');

const login = {
    get: (email, passwordhash, callback) => {
        console.log(email, passwordhash);
        db.query('select * from person where email=? and passwordhash=?', 
            [email, passwordhash],
            callback);
    },

    
}

module.exports = login;