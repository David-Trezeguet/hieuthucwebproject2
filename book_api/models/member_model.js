const db = require('../database.js');

const member = {
    get: (emailaddress, password, callback) => {
        console.log(emailaddress, password);
        db.query('select * from `member` where emailaddress=? and password=?', 
            [emailaddress, password],
            callback);
    },

    add: (member, callback) => {
        db.query(
            'insert into `member`(firstname, lastname, emailaddress, password, address, phonenumber) values(?, ?, ?, ?, ?, ?)', 
            [member.firstname, member.lastname, member.emailaddress, member.password, member.address, member.phonenumber],
            callback);
    },
}

module.exports = member;