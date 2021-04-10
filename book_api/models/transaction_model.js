const db = require('../database.js');
       
const transaction = {
    getAll: (callback) => db.query(
        'select * from transaction inner join `member` on transaction.idmember=member.idmember inner join book on transaction.idbook=book.idbook order by idtransaction desc',
        callback
    ),
    getById: (id, callback) => db.query(
        'select * from transaction inner join `member` on transaction.idmember=member.idmember inner join book on transaction.idbook=book.idbook where idtransaction=?',
        [id],
        callback
    
    ),
    getmembers: (callback) => db.query(
        `select concat(title, " ", author) as book, group_concat(firstname, " ", lastname) as "book owner" 
         from transaction inner join member on transaction.idmember=member.idmember inner join book on transaction.idbook=book.idbook 
         group by transaction.idbook;`,
        callback
    ),
    add: (transaction, callback) => {
        if (transaction && Object.keys(transaction).length > 0) {
            // do not insert when (idmember, idbook) exists
            // caution: INSERT INTO does not work with WHERE
            return db.query(
                `insert into transaction(idmember, idbook)
                 select ?, ? where not exists 
                     (select * from transaction where idmember=? and idbook=?)`,
                [transaction.idmember, transaction.idbook],
                callback
            )
        }
    },
    update: (id, transaction, callback) => db.query(
        'update transaction set idmember=?, idbook=? where idtransaction=?',
        [transaction.idmember, transaction.idbook, id],
        callback
    ),
    delete: (id, callback) => db.query(
        'delete from transaction where idtransaction=?',
        [id],
        callback
    )
};

module.exports = transaction;