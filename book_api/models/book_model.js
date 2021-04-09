const db = require('../database.js');

const book = {
    getByIdbook: (idbook, callback) => {
        if ( idbook ) { 
            db.query(
                'select * from book inner join `member` on book.idmember=`member`.idmember where idbook=?',
                [idbook],
                callback
            );
        } else {
            console.log("\x1b[31m", 'getAllBooksByMember ERROR: idmember not found!!!', "\x1b[0m");  // red color -> message -> reset color
            return;
        }
    },

    getByIdmember: (idmember, callback) => {
        if ( idmember ) { 
            db.query(
                'select * from book where idmember=?',
                [idmember],
                callback
            );
        } else {
            console.log("\x1b[31m", 'getAllBooksByMember ERROR: idmember not found!!!', "\x1b[0m");  // red color -> message -> reset color
            return;
        }
    }, 

    add: (book, callback) => {
        if ( book && Object.keys(book).length > 0 ) {  
            db.query(
                'insert into book(title, idmember, author) values(?, ?, ?)',
                [book.title, book.idmember, book.author],
                callback
            );
        } else {
            console.log("\x1b[31m", 'ERROR: empty POST body!!!', "\x1b[0m");  // red color -> message -> reset color
            return;
        }
    }
}

module.exports = book;