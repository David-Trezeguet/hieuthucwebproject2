const db = require('../database');

const message = {
  getByIdbookAndIdmember: function(idbook, idmember, callback) {
    return db.query(
      "select b.idbook, b.images, b.idmember, m.idsender, m.idreceiver, m.text, m.time, concat(mb.firstname, ' ', mb.lastname) as sender_name, concat(mb2.firstname, ' ', mb2.lastname) as receiver_name from book b left join message m on b.idbook=m.idbook inner join `member` mb on mb.idmember=m.idsender inner join `member` mb2 on mb2.idmember=m.idreceiver where b.idbook=? and (m.idsender=? or m.idreceiver=?) order by time asc limit 20",
      [idbook, idmember, idmember],
      callback
    );
  },

  add: function(message, callback) {
    return db.query(
      'insert into message (idbook, idsender, idreceiver, text, time) values(?,?,?,?, now())',
      [parseInt(message.idbook), parseInt(message.idsender), parseInt(message.idreceiver), message.text],
      callback
    );
  }
};

module.exports = message;