var express = require('express');
var db_mods = require('../db_mods');
var utils = require('../utils');

// includes for csrf 
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var router = express.Router();

// there's nothing to do from the main titles page
// titles belong to companies, so send them back to the company
// page to start their journey

router.route('/')
  .get(function (req, res) {
    res.redirect('/company');
  });

// for actions we want to take on company titles.
// basically: delete, post, get, put.

router.route('/:pk')
  .get(utils.checkAuth, csrfProtection, function (req, res) {
    console.log(req.params.pk);
    db_mods.title.getTitlesByCompany(req, res);
  })
  .post(utils.checkAuth, csrfProtection, function (req, res) {
    db_mods.title.createTitle(req, res);
  })
  .put(utils.checkAuth, csrfProtection, function (req, res) {
    db_mods.title.updateTitle(req, res);
  })
  .delete(utils.checkAuth, csrfProtection, function (req, res) {
    db_mods.title.deleteTitle(req, res);
  });

module.exports = router;
