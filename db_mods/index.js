var models = require('../models');

exports.createCompany = function (req, res) {
  models.Company.create({
    name: req.param('name')
  })
    .then(function () {
      res.redirect('/');
    });
};

exports.getCompany = function (req, res) {
  models.Company.Company.findAll({
    where: {
      uuid: {
        in: req.session.companies
      }
    }
  })
    .then(function (companies) {
      res.render('company', {companies:  companies});
    });
};