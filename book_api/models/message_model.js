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