module.exports = function (sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    // i'd usually have an `owner` field here so we can say what user has
    // ownership of the company, so who has permission to edit, view, etc.
    // however, we're just going to do that with sessions for the sake of our app
    // and simplicity.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      },
    },
    // not sure if this is unique always, i'd assume so
    // i'd like to do some more research, possibly implement/use
    // incrementing uuid (mssql has this)
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    }
  }, {
    classMethods: {
      associate: function (models) {
        Company.hasMany(models.Employee, {as: "Employees"});
        Company.hasMany(models.Title, {as: "Titles"});
      }
    }
  });
  return Company;
};