const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('soundcloud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const verifyConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
  }
}

verifyConnection();

module.exports = sequelize;
