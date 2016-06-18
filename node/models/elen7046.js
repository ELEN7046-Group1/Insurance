var connection = require('../connection');

function elen7046() {

    this.getCaseByProvince = function (res) {
        connection.acquire(function (err, con) {
            con.query('SELECT COUNT(C.address_physical_province) as count, C.address_physical_province as province FROM incident as A INNER JOIN policy as B ON A.policy = B.id INNER JOIN customer as C ON B.customer = C.id WHERE A.status in(3,4,5,6,7,8) GROUP BY C.address_physical_province', function (err, result) {
                if (err) throw err;
                con.release();
                res.send(result);
            });
        });
    }

    this.getCaseByDateRange = function (from, to, res) {
        console.log("Requested FROM:" + from + " TO:" + to + " on " + Date());
        connection.acquire(function (err, con) {
            con.query("SELECT COUNT(id) as DayTotal, DATE_FORMAT(created_on,'%Y-%m-%d') AS 'Date' FROM incident WHERE created_on >= ? AND created_on <= ? " +
                "GROUP BY created_on " +
                "ORDER BY created_on;", [from, to], function (err, result) {
                con.release();
                if (err) {
                    res.send({
                        status: 1, message: 'Failed to retrieve incident'
                    });

                }
                else {
                    res.send(result);
                }
            });
        });
    }

    this.getCustomerPerProvince = function (res) {
        connection.acquire(function (err, con) {
            con.query("SELECT COUNT(address_physical_province) as count, address_physical_province as province FROM customer GROUP BY address_physical_province", function (err, result) {
                con.release();
                if (err) {
                    res.send({
                        status: 1, message: 'Failed to retrieve customers per province'
                    });
                }
                else {
                    res.send(result);
                }
                ;
            });
        });
    }
    this.getCasesSankey = function (res) {
        connection.acquire(function (err, con) {
            con.query("SELECT Distinct id as node, id as name from incident_status", function (err, result) {
                con.release();
                if (err) {
                    res.send({
                        status: 1, message: 'Failed to retrieve headers'
                    });
                }
                else {
                    connection.acquire(function(err2, con2){
                        con2.query("SELECT status_old as source, status_new as target, COUNT(status_new) as value FROM incident_audit GROUP BY  1", function (err2, result2){
                            con2.release();
                            if(err2){
                                res.send({
                                    status: 1, message: 'Failed to retrieve case movement'
                                });
                            }
                            else
                            {
                                res.send({nodes: result, links: result2});
                            }
                        })
                    })
                }
                ;
            });
        });
    }
}

module.exports = new elen7046();