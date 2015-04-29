var express = require('express');
var app = require('../app');
var router = express.Router();

// Ideally, I'd like for the below actions to be factored out into
// their own module. From there I'd have tests, etc.. to ensure
// all of our model updates are working correctly. 
// I'd wrap it in both a RESTful API and in a non-js app
// But, due to time constraints, we're going to do what we can!

router.route('/')

  .post(function (req, res) {
    var Company = app.get('models').Company();
    Company.name = req.body.name;
    Company.save(function (err) {
      if (err) { res.send('company', {error: err}); }
    });
  })

  .get(function (req, res) {
    if (req.session.companies) {
      var Company = app.get('models').Company();
      var companies = Company.findAll({
        where: {
          uuid: {
            in: req.session.companies
          }
        }
      });
      res.render('company', {companies:  companies});
    }
    res.render('company');
  });

module.exports = router;
