var models = require('../models');

exports.createCompany = function (req, res) {
  models.Company.build(
    {name: req.body.name},
    { validate: true }
  )
    .save()
    .then(function (company) {
      console.log(company.get({
        plain: true
      }));
      var companies = req.session.companies;
      if (!companies) {
        req.session.companies = [company.uuid];
        res.redirect('/company');
      } else {
        req.session.companies.push(company.uuid);
        res.redirect('/company');
      }
    }).catch(function (error) {
      res.render('error', {error:  error});
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