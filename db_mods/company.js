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

exports.getCompanies = function (req, res) {
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

exports.getCompanyInfoByPk = function (req, res) {
  models.Company.find({
    where: {
      uuid: req.params.pk
    }
  })
    .then(function (company) {
      console.log(company);
      var titles = company.getTitles({plain: true});
      var employees = company.getEmployees({plain: true});
      res.render('company', {
        company:  company.get({plain: true}),
        titles: titles,
        employees: employees,
      });
    }).catch(function (error) {
      res.render('company', {error:  error});
    });
};