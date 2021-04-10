const db = require('../database');

const message = {
  getByIdbookAndIdmember: function(idbook, idmember, callback) {
    return db.query(
      `select book.idbook, book.image, message.idmember, message.idreceiver, message.message, message.time, 
        concat(member.firstname, ' ', member.lastname) as sender_name, 
        concat(member2.firstname, ' ', member2.lastname) as receiver_name 
      from book left join message on book.idbook=message.idbook 
        inner join member on member.idmember=message.idperson inner join member as member2 on member2.idmember=message.idreceiver 
      where book.idbook=? 
      and (message.idmember=? or message.idreceiver=?) 
      order by time asc`,
      [idbook, idmember, idmember],
      `select b.idbook, b.image, m.idmember, m.idreceiver, m.message, m.time, concat(mb.firstname, ' ', mb.lastname) 
      as sender_name, concat(mb2.firstname, ' ', mb2.lastname) as receiver_name from book b left join message m on b.idbook=m.idbook 
      inner join member mb on mb.idmember=m.idmember inner join member mb2 on mb2.idmember=m.idreceiver where b.idbook=? 
      and (m.idmember=? or m.idreceiver=?) order by time asc limit 20`,
      [idbook, idmember, idmember],
      callback
    );
  },

  add: function(message, callback) {
    return db.query(
      'insert into message (idbook, idmember, idreceiver, message, time) values(?,?,?,?, now())',
      [parseInt(message.idbook), parseInt(message.idmember), parseInt(message.idreceiver), message.message],
      callback
    );
  }
};

module.exports = message;