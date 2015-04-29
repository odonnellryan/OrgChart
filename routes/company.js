var express = require('express');
var db_mods = require('../db_mods');
var router = express.Router();

router.route('/')
  .post(function (req, res) {
    db_mods.createCompany(req, res);
  })
  .get(function (req, res) {
    var companies = req.session.companies;
    console.log(companies);
    if (companies) {
      db_mods.getCompany(req, res);
    } else {
      res.render('company');
    }
  });

module.exports = router;
