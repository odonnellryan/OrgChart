var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('title', { title: 'this is the future page for titles!' });
});

module.exports = router;
