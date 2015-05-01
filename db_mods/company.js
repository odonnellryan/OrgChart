var models = require('../models');

// the database actions for various `company` related tasks

exports.createCompany = function (req, res) {
  models.Company.build(
    { name: req.body.name },
    { validate: true }
  ).save()
    .then(function (company) {
      // since we're relying on sessions for simplicity,
      // this will set the session if it does not exist
      // if it does, it'll add the company uuid to it
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

// gets all companies that have uuid'd stored in the session

exports.getCompanies = function (req, res) {
  models.Company.findAll({
    where: {
      uuid: { in: req.session.companies }
    }
  })
    .then(function (companies) {
      res.render('company', {companies:  companies, csrfToken: req.csrfToken()});
    }).catch(function (error) {
      res.render('company', {error:  error});
    });
};

// Get a specific company's information by primary key. Not completed.

exports.getCompanyInfoByPk = function (req, res) {
  models.Company.find({
    where: {
      uuid: req.params.pk
    }
  })
    .then(function (company) {
      res.render('company', {
        company:  company.get({plain: true}),
      });
    }).catch(function (error) {
      res.render('company', {error:  error});
    });
};