module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Employee.belongsTo(models.Company);
        Employee.belongsTo(models.Title);
        Employee.hasMany(models.Employee, {as: "Managers"});
      }
    }
  });
  return Employee;
};