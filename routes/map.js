var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/map/', function(req, res) {
  res.render('index', { title: 'Nebulous' });
});

module.exports = router;
