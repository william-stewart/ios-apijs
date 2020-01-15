var mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    connectionLimit: process.env.DBCONNECTIONLIMIT,
    supportBigNumbers: process.env.DBSUPPORTBIGNUMBERS
});

exports.getDataFromDb = function(callback) {
    const queryString = "SELECT * from leaderboard where position >= 1 and position <= 5";

    pool.getConnection(function(err, connection) {
        if (err) {console.log(err); callback(true); return;}
        connection.query(queryString, function(err, results) {
            connection.release();
            if(err) {console.log(err); callback(true); return;}
            callback(false, results);
        })
    })
};