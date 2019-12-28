var express = require('express');
var router = express.Router();
const controllerRequest = require('../controllers/request')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blank');
});
router.get('/statistic',controllerRequest.request)
router.get('/list',controllerRequest.list)
module.exports = router;
