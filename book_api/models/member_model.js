const db = require('../database.js');

const member = {
    noname: (username, passwordhash, callback) => {
        db.query('select * from `member` where idmember in (select idmember from login where username=? and passwordhash=?)', 
            [username, passwordhash],
            callback);
        console.log(username, passwordhash);
    },

    
}

module.exports = member;