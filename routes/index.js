var express = require('express');
var Handlebars = require('hbs');
var numeral = require('numeral');


var router = express.Router();
const controllerRequest = require('../controllers/request')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blank');
});

numeral.register('locale', 'fr', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'M',
        billion: 'G',
        trillion: 'T'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});

// switch between locales
numeral.locale('fr');

Handlebars.registerHelper('num',function(a){
  return new Handlebars.SafeString(numeral(a).format("0 a").toUpperCase()+"h/s");//   numeral(a).format('00.0 a');
});
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
Handlebars

router.get('/list',controllerRequest.list)
module.exports = router;
