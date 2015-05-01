var express = require('express');
var db_mods = require('../db_mods');
var utils = require('../utils');

// includes for csrf 
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var router = express.Router();

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

//
// Not completed.
// This function would eventually be the entrypoint to the entire 
// org chart. It would call all the needed subroutines to build the chart.
//
router.route('/:pk')
  .get(utils.checkAuth, function (req, res) {
    console.log(req.params.pk);
    db_mods.company.getCompanyInfoByPk(req, res);
  });

module.exports = router;
