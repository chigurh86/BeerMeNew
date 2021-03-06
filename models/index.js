const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const winston = require('winston');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';

const db = {};

const database = process.env.DB_NAME || 'express-cc';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || 'root';
const host = process.env.DB_HOST || 'localhost';

let dbConnection;
if (process.env.NODE_ENV === 'production') {
dbConnection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
/*  dbConnection = mysql.createConnection({
    host,
    user: username,
    password
  }); */
} else {
  dbConnection = mysql.createConnection({
    host,
    user: username,
    password,
    database,
    socketName: '/tmp/mysql.sock'
  });
}
dbConnection.connect();

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    }

  });
}
dbConnection.end({ timeout: 60000 });

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
