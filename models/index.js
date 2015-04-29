var Sequelize = require('sequelize');

var sequelize = new Sequelize('db', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

// load models
var models = [
  'Company',
  'Title',
  'Employee'
];

models.forEach(function (model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function (m) {
  m.Employee.belongsTo(m.Company);
  m.Employee.belongsTo(m.Title);
  m.Employee.hasMany(m.Employee, {as: "Managers"});
  m.Company.hasMany(m.Employee, {as: "Employees"});
  m.Title.belongsTo(m.Company);
}(module.exports));

module.exports.sequelize = sequelize;