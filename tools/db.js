var mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    connectionLimit: process.env.DBCONNECTIONLIMIT,
    supportBigNumbers: process.env.DBSUPPORTBIGNUMBERS
});



exports.getAllMessages = function(callback) {
    const queryString = "SELECT userID,boardName,messageTitle,message,postedDate from messageboard";

    pool.getConnection(function(err, connection) {
        if (err) {console.log(err); callback(true); return;}
        connection.query(queryString, function(err, results) {
            connection.release();
            if(err) {console.log(err); callback(true); return;}
            callback(false, results);
        })
    })
};

exports.getMessagesByUser = function(params,callback) {
    const queryString = "SELECT userID,boardName,messageTitle,message,postedDate from messageboard where userID = ?";
    pool.getConnection(function(err, connection) {
        if (err) {console.log(err); callback(true); return;}
        connection.query(queryString,[params.user], function(err, results) {
            connection.release();
            if(err) {console.log(err); callback(true); return;}
            callback(false, results);
        })
    })
};

exports.getMessagesByBoard = function(params,callback) {
    const queryString = "SELECT userID,boardName,messageTitle,message,postedDate from messageboard where boardName = ?";
    pool.getConnection(function(err, connection) {
        if (err) {console.log(err); callback(true); return;}
        connection.query(queryString,[params.boardName], function(err, results) {
            connection.release();
            if(err) {console.log(err); callback(true); return;}
            callback(false, results);
        })
    })
};

exports.addMessage = function(params,callback) {
    const queryString = "INSERT into messageboard values (? , ? , ? , ?)";

    pool.getConnection(function(err, connection) {
        if (err) {console.log(err); callback(true); return;}
        connection.query(queryString,[params.userID,params.messageTitle,params.message,params.posted], function(err, results) {
            connection.release();
            if(err) {console.log(err); callback(true); return;}
            callback(false, results);
        })
    })
};