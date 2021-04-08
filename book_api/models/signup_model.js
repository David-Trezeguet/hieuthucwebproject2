const db = require('../database.js');

const signup = {
    getAll: (callback) => db.query('select * from `member` order by idmember desc', callback),

    getById: (id, callback) => {
        if (id) {  // id: string
            db.query('select * from `member` where idmember=? order by idmember desc', [id], callback);
        }
    },

    add: (member, callback) => {
        if ( member && Object.keys(member).length > 0 ) {  // member: object
            db.query(
                'insert into member(firstname, lastname, emailaddress, password, address, phonenumber, creditscore, image) values(?,?,?,?,?,?,?,?)',
                [member.firstname, member.lastname, member.emailaddress, member.password, member.address, member.phonenumber, member.creditscore, member.image],
                callback
            );
        } else {
            console.log("\x1b[31m", 'ERROR: empty POST body!!!', "\x1b[0m");  // red color -> message -> reset color
            return;
        }
    },

    update: (id, member, callback) => {
        if ( member && Object.keys(member).length > 0 ) {
            db.query(
                'update member set firstname=?, lastname=?, emailaddress=?, password=?, address=?, phonenumber=?, creditscore=?, image=? where idmember=?',
                [member.firstname, member.lastname, member.emailaddress,  member.password, member.address, member.phonenumber, member.creditscore, member.image, id],
                callback
            )
        } else {
            // console.log("\x1b[31m", 'ERROR: empty PUT body!!!', "\x1b[0m");  // red color -> message -> reset color
            throw new Error('Empty PUT body!');
            return;
        }
    },

    delete: (id, callback) => db.query('delete from `member` where idmember=?', [id], callback),

    searchByfirstname: (value, callback) => {
        const likeString = `%${value}%`;
        db.query('select * from `member` where firstname like ?', [likeString], callback)
    },

    searchBylastname: (value, callback) => {
        const likeString = `%${value}%`;
        db.query('select * from `member` where lastname like ?', [likeString], callback)
    }
}

module.exports = signup;