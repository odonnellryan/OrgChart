var sequelize = new Sequelize('db', 'username', 'password', {
  host: 'localhost',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: 'db.sqlite'
});