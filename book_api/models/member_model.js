const db = require('../database.js');

const member = {
    get: (emailaddress, password, callback) => {
        console.log(emailaddress, password);
        db.query('select * from `member` where emailaddress=? and password=?', 
            [emailaddress, password],
            callback);
    },

    
}

module.exports = member;