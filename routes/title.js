var express = require('express');
var db_mods = require('../db_mods');
var router = express.Router();

router.route('/')
  .post(function (req, res) {
    // I'd like to look into this more to see if doing things
    // in this manner fits in with the event loop model
    // of Node.js. This needs testing.
    db_mods.createTitle(req, res);
  })
  .get(function (req, res) {
    if (req.session.companies) {
      db_mods.getTitles(req, res);
    } else {
      res.redirect('/company');
    }
  });

module.exports = router;
