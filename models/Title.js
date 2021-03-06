module.exports = function (sequelize, DataTypes) {
  var Title = sequelize.define('Title', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255]
      }
    },
    rank: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        max: 99
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Title.belongsTo(models.Company);
      }
    }
  });
  return Title;
};