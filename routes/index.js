var express = require('express');
var router = express.Router();

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

router.get('/', function (req, res) {
  sleep(100000);
  res.render('index', { title: 'OrgChart.js!' });
});

module.exports = router;
