var express = require('express');

//
// I feel there may be a better way of doing this.
// if they're using a company_uuid that doesn't belong
// to their session they aren't authenticated.
// 
exports.checkAuth = function (req, res, next) {
  var params_pk = req.params.pk;
  var body_pk = req.body.pk;
  var session = false;
  if (!req.session.companies) {
    session = true;
  } else {
    if (params_pk) {
      console.log(params_pk);
      console.log(req.session.companies);
      if (req.session.companies.indexOf(params_pk) > -1) {
        params_pk = false;
      } else {
        params_pk = true;
      }
    }
    if (body_pk) {
      if (req.session.companies.indexOf(body_pk) > -1) {
        body_pk = false;
      } else {
        body_pk = true;
      }
    }
  }
  if (body_pk || params_pk || session) {
    res.render('company', {error: "Not authorized to view item or item does not exist."});
  } else {
    next();
  }
};