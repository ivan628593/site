var express = require('express');
var Handlebars = require('hbs');
var router = express.Router();
const controllerRequest = require('../controllers/request')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blank');
});
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

router.get('/list',controllerRequest.list)
module.exports = router;
