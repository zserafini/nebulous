var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('map_editor', { title: 'Nebulous Map Editor' });
});

module.exports = router;
