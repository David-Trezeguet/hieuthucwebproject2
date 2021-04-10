const db = require('../database.js');

const book = {
    getByIdbook: (idbook, callback) => {
        if ( idbook ) { 
            db.query(
                'select * from book inner join `member` on book.idmember=member.idmember where idbook=?',
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
    
//check add 
    add: (book, callback) => {
        if ( book && Object.keys(book).length > 0 ) {  
            db.query(
                'insert into book(title, idmember, author) values(?, ?, ?)',
                [book.title, book.idmember, book.author],
                'insert into book(title, idmember, author, year, edition, condition, image, description) values(?, ?, ?, ?, ?, ?, ?, ?)',
                [book.title, book.idmember, book.author, book.year, book.edition, book.condition, book.image, book.description],
                callback
            );
        } else {
            console.log("\x1b[31m", 'ERROR: empty POST body!!!', "\x1b[0m");  // red color -> message -> reset color
            return;
        }
    }
}

module.exports = book;