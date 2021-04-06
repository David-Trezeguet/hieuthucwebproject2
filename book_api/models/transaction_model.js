const db = require('../database.js');
const transaction = {
    getAll: (callback) => db.query(
        `select * from transaction inner join person on transaction.idmember=member.idmember 
        inner join book on transaction.idbook=book.idbook order by idtransaction desc`,
        callback
    ),
    getById: (id, callback) => db.query(
        `select * from transaction co inner join member c on transaction.idmember=member.idmember 
        inner join owner o on transaction.idowner=o.idowner where idtransaction=?`,
        [id],
        callback
    
    ),
    getmembers: (callback) => db.query(
        'select concat(firstname, " ", lastname) as name, group_concat(brand, " ", model separator ", ") as owned_members \
         from transaction co left join member c on transaction.idmember=member.idmember left join owner o on transaction.idowner=o.idowner \
         group by transaction.idowner;',
        callback
    ),
    add: (transaction, callback) => {
        if (transaction && Object.keys(transaction).length > 0) {
            // do not insert when (idmember, idowner) exists
            // caution: INSERT INTO does not work with WHERE
            return db.query(
                'insert into transaction(idmember, idowner)\
                 select ?, ? where not exists \
                     (select * from transaction where idmember=? and idowner=?)',
                [transaction.idmember, transaction.idowner, transaction.idmember, transaction.idowner],
                callback
            )
        }
    },
    update: (id, transaction, callback) => db.query(
        'update transaction set idmember=?, idowner=? where idtransaction=?',
        [transaction.idmember, transaction.idowner, id],
        callback
    ),
    delete: (id, callback) => db.query(
        'delete from transaction where idtransaction=?',
        [id],
        callback
    )
}

module.exports = transaction;