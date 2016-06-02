var mysql = require('mysql');
 
function Connection() {
    this.pool = null;

    this.init = function () {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: '130.211.57.133',
            user: 'root',
            password: 'K!ranTheN@zi',
            database: 'Insurance'
        });
    };
    this.acquire = function (callback) {
        this.pool.getConnection(function (err, connection) {
            callback(err, connection);
        });
    };
}

module.exports = new Connection();