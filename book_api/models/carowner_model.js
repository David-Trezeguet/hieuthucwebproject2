const db = require('../database.js');
const carowner = {
    getAll: (callback) => db.query(
        'select * from carowner co inner join car c on co.idcar=c.idcar inner join owner o on co.idowner=o.idowner order by idcarowner desc',
        callback
    ),
    getById: (id, callback) => db.query(
        'select * from carowner co inner join car c on co.idcar=c.idcar inner join owner o on co.idowner=o.idowner where idcarowner=?',
        [id],
        callback
    
    ),
    getCars: (callback) => db.query(
        'select concat(firstname, " ", lastname) as name, group_concat(brand, " ", model separator ", ") as owned_cars \
         from carowner co left join car c on co.idcar=c.idcar left join owner o on co.idowner=o.idowner \
         group by co.idowner;',
        callback
    ),
    add: (carowner, callback) => {
        if (carowner && Object.keys(carowner).length > 0) {
            // do not insert when (idcar, idowner) exists
            // caution: INSERT INTO does not work with WHERE
            return db.query(
                'insert into carowner(idcar, idowner)\
                 select ?, ? where not exists \
                     (select * from carowner where idcar=? and idowner=?)',
                [carowner.idcar, carowner.idowner, carowner.idcar, carowner.idowner],
                callback
            )
        }
    },
    update: (id, carowner, callback) => db.query(
        'update carowner set idcar=?, idowner=? where idcarowner=?',
        [carowner.idcar, carowner.idowner, id],
        callback
    ),
    delete: (id, callback) => db.query(
        'delete from carowner where idcarowner=?',
        [id],
        callback
    )
}

module.exports = carowner;