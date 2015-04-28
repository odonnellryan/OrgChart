module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  });
  return Employee;
};