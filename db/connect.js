const { Sequelize } = require('sequelize');

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const sequelize = new Sequelize('soundcloud', user, password, {
  host: host,
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
