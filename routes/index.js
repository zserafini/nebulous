var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Nebulous' });
});

router.get('/images/generated/*', function(req, res, next) {
  file_name = req.params[0];
  object_name = file_name.match(/[^\d]*/)[0]
  object_size = file_name.match(/\d+/)[0]
  sprite_sheet_generator.create_sheet(object_name, object_size, 8);
  next();
});

module.exports = router;
