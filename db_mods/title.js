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
        res.render('title', {company: company, titles: titles, csrfToken: req.csrfToken()});
      }).catch(function (error) {
        res.render('error', {error:  error});
      });
    }).catch(function (error) {
      res.render('error', {error:  error});
    });
};

exports.deleteTitle = function (req, res) {
  models.Title.find({
    where: {
      id: req.body.id
    }
  })
    .then(function (title) {
      // check if the title belongs to a company that we own
      if (!(req.session.companies.indexOf(title.CompanyUuid) > -1)) {
        res.render('company', {error: "Not authorized to view task or task does not exist."});
      } else {
        title.destroy().then(function () {
          res.redirect(req.params.pk);
        }).catch(function (error) {
          res.render('error', {error:  error});
        });
      }
    }).catch(function (error) {
      res.render('error', {error:  error});
    });
};

exports.updateTitle = function (req, res) {
  models.Title.find({
    where: {
      id: req.body.id
    }
  })
    .then(function (title) {
      // repeated check to see if the title belongs to a company we own
      // TODO: factor this out
      console.log(title);
      if (!(req.session.companies.indexOf(title.CompanyUuid) > -1)) {
        res.render('company', {error: "Not authorized to view task or task does not exist."});
      } else {
        title.updateAttributes({
          name: req.body.name,
          rank: req.body.rank
        }).then(function () {
          res.redirect(req.params.pk);
        }).catch(function (error) {
          res.render('error', {error:  error});
        });
      }
    }).catch(function (error) {
      res.render('error', {error:  error});
    });
};