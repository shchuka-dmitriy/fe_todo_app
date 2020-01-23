/*работа с таблицами*/

'use strict';
import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {                  /*экспортируем ф-цию которая возвращает модель*/
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {                               /*можно и без validate*/
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6,16]                       /*размер от 6 до 16*/
      }
    },
    // passwordHash: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'passwordHash',
      set (val) {
        this.setDataValue('password', bcrypt.hashSync( val, 10));
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};