var express = require('express');
var db_mods = require('../db_mods');
var router = express.Router();

// landing page for all companies
router.route('/')
  .post(function (req, res) {
    // I'd like to look into this more to prove if doing things
    // in this manner fit in with the event loop model
    // of Node.js. This needs testing.
    db_mods.createCompany(req, res);
  })
  .get(function (req, res) {
    // if we don't have any companies stored in the session we'll just 
    // go back to the main page to allow the user to create a company
    //
    // this is a good candidate for caching. why query the db each 
    // page load?
    // for now we'll hold off on caching, but revisit.
    if (req.session.companies) {
      db_mods.getCompanies(req, res);
    } else {
      res.render('company');
    }
  });

// this is the page for a specific company
// will allow us to view the companie's org chart
// and give us our links to add titles, users, etc.
router.route('/:pk')
  .get(function (req, res) {
    console.log(req.params.pk);
    db_mods.getCompanyInfoByPk(req, res);
  });

module.exports = router;
