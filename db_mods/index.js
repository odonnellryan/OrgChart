var models = require('../models');

exports.createCompany = function (req, res) {
  models.Company.build(
    { name: req.body.name },
    { validate: true }
  ).save()
    .then(function (company) {
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

exports.getCompany = function (req, res) {
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

exports.createTitle = function (req, res) {
  models.Company.build(
    { name: req.body.name },
    { validate: true }
  ).save()
    .then(function (company) {
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

exports.getCompany = function (req, res) {
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
