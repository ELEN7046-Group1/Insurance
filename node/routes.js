var elen7046 = require('./elen7046');

module.exports = {
    configure: function (app) {

        app.get('/elen7046/cases/perday/:from/:to', function (req, res) {
            res.setHeader('content-type', 'application/json');
            elen7046.getCaseByDateRange(req.params.from, req.params.to, res);
            //console.log(req.params.to);
        });

        app.get('/elen7046/cases/perprovince/', function (req, res) {
            res.setHeader('content-type', 'application/json');
            elen7046.getCaseByProvince(res);
        });

        app.get('/elen7046/cases/sankey/', function (req, res1, res2) {
            res1.setHeader('content-type', 'application/json');
            res2.setHeader('content-type', 'application/json');
            elen7046.getCasesSankey(res1, res2);
        });

        app.get('/elen7046/customers/perprovince/', function (req, res) {
            res.setHeader('content-type', 'application/json');
            elen7046.getCustomerPerProvince(res);
        });
    }
};