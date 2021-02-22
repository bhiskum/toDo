var db = require('../dbconnection');


var Login = {

  login: function (Login, callback) {
    return  db.query("select * from users where email=?", [Login.email], callback);
  },
  addUser: function (Login, callback) {
     return db.query("Insert into users (name,email,password) values(?,?,?)", [Login.name, Login.email, Login.password], callback);
  },
  getUser: function (userId, callback) {
    return db.query("select *  from users where userId =?", [userId], callback);
 },

};
module.exports = Login;