var Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize('db', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
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

// describe relationships
(function (m) {
  m.Employee.belongsTo(m.Company);
  m.Employee.belongsTo(m.Title);
  m.Employee.hasMany(m.Employee, {as: "Managers"});
  m.Company.hasMany(m.Employee, {as: "Employees"});
  m.Title.belongsTo(m.Company);
}(module.exports));

// export connection
module.exports.sequelize = sequelize;