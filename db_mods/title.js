var models = require('../models');

exports.createTitle = function (req, res) {
  models.Company.build(
    { name: req.body.name },
    { validate: true }
  ).save()
    .then(function (company) {
      var company_pk = req.params.pk;
      // normally we'd do some real login/auth.
      // but that's beyond the scope of the project. We'll
      // just check to see if the company uuid is in the session
      if (company in req.session.companies) {

      }

      if (!req.session.companies) {
        req.session.companies = [company.uuid];
        res.redirect('/company');
      } else {
        req.session.companies.push(company.uuid);
        res.redirect('/company');
      }
    }).catch(function (error) {
      res.render('company', {error:  error});
    });
};

exports.getTitlesByCompany = function (req, res) {
  models.Company.findAll({
    where: {
      uuid: { in: req.session.companies }
    }
  })
    .then(function (companies) {
      console.log(companies);
      res.render('company', {companies:  companies});
    });
};