'use strict';

 module.exports = function (sequelize, DataTypes) {
   const Beer = sequelize.define('Beer', {
     beername: DataTypes.STRING,
     user: DataTypes.INTEGER
  //  }, {
  //   classMethods: {
  //     associate: function (models) {
  //       Beer.belongsToMany(models.User);
   // 
  //     }
  //   }
  });
  return Beer;
 };
