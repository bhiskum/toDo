var db = require('../dbconnection'); //reference of dbconnection.js

var Task = {

    
    getTaskById: function (id, callback) {

        return db.query("select * from task where userId=?", [id], callback);
    },
    addTask: function (Task, callback) {
        return db.query("Insert into task (Title,status,userId) values(?,?,?)", [Task.body.Title, Task.body.Status, Task.userId], callback);
        
    },
    deleteTask: function (id, callback) {
        return db.query("delete from task where ID=?", [id], callback);
    },
    updateTask: function (id, Task, callback) {
        return db.query("update task set Title=?,Status=? where ID=?", [Task.Title, Task.Status, id], callback);
    }

};
module.exports = Task;