var models = require('../models');

exports.createTitle = function (req, res) {
  models.Title.build(
    { name: req.body.name,
      rank: req.body.rank,
      CompanyUuid: req.params.pk
      },
    { validate: true }
  ).save()
    .then(function () {
      res.redirect(req.params.pk);
    }).catch(function (error) {
      res.render('error', {error:  error});
    });
};

exports.getTitlesByCompany = function (req, res) {
  models.Title.findAll({
    where: {
      CompanyUuid: req.params.pk
    }
  })
    .then(function (titles) {
      models.Company.find({
        where: {
          uuid: req.params.pk
        }
      }).then(function (company) {
        res.render('title', {company: company, titles: titles});
      });
    });
};