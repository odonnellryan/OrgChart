var models = require('../models');

exports.createCompany = function (req, res) {
  models.Company.create({
    name: req.param('name')
  })
    .then(function (company) {
      var companies = req.session.companies;
      if (!companies) {
        companies = req.session.companies = [company.uuid];
        res.redirect('/');
      } else {
        req.session.companies.push(company.uuid);
        res.redirect('/');
      }
    });
};

exports.getCompany = function (req, res) {
  models.Company.findAll({
    where: {
      uuid: {
        in: req.session.companies
      }
    }
  })
    .then(function (companies) {
      console.log(companies);
      res.render('company', {companies:  companies});
    });
};