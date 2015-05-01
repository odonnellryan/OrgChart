var express = require('express');
var db_mods = require('../db_mods');
var router = express.Router();
var utils = require('../utils');

// includes for csrf 
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

// landing page for all companies
router.route('/')
  .post(csrfProtection, function (req, res) {
    db_mods.company.createCompany(req, res);
  })
  .get(csrfProtection, function (req, res) {
    // if we don't have any companies stored in the session we'll just 
    // go back to the main page to allow the user to create a company
    if (req.session.companies) {
      db_mods.company.getCompanies(req, res);
    } else {
      res.render('company', {csrfToken: req.csrfToken()});
    }
  });

// this is the page for a specific company
// will allow us to view the companie's org chart
// and give us our links to add titles, users, etc.
router.route('/:pk')
  .get(utils.checkAuth, function (req, res) {
    console.log(req.params.pk);
    db_mods.company.getCompanyInfoByPk(req, res);
  });

module.exports = router;
