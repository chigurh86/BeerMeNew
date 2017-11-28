'use strict';

 var fs = require('fs');
 var path = require('path');
 const Sequelize = require('sequelize');

 var orm = {};

console.log('----------------> i got here', process.env.NODE_ENV, process.env.JAWSDB_URL);

 var dbName = process.env.DB_NAME || 'express-cc';
 var dbUser = process.env.DB_USER || 'root';
 var dbPassword = process.env.DB_PASSWORD || 'root';
 var dbHost = process.env.DB_HOST || 'localhost';

 /*const sequelize = new Sequelize(prcoess, "root", "root", {
   host: 'localhost',
   dialect: 'mysql',
   pool: {
     max: 5,
     min: 0,
     idle: 10000
   }, define: {
        timestamps: false
    }

 });
*/
 const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
   host: dbHost,
   dialect: 'mysql',
   pool: {
     max: 5,
     min: 0,
     idle: 10000
   }, define: {
        timestamps: false
    }

 });

 fs
   .readdirSync(__dirname)
   .filter(function (file) {
     return (file.indexOf('.') !== 0) && (file !== 'index.js');
   })
   .forEach(function (file) {
     var model = sequelize.import(path.join(__dirname, file));
     orm[model.name] = model;
   });

 Object.keys(orm).forEach(function (modelName) {
   if ('associate' in orm[modelName]) {
     orm[modelName].associate(orm);
   }
 });

 // Create tables for all models that don't
 // currently have a table in the current database.
 sequelize.sync();
 orm.sequelize = sequelize;
 orm.Sequelize = Sequelize;

 module.exports = orm;
