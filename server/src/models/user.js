/*работа с таблицами. Это абстракция таблицы в коде. Нужна чтобы силами js меняли в ней значения*/

'use strict';

import bcrypt                          from 'bcrypt';
import { LOGIN_PATTERN, NAME_PATTERN } from '../constants';

module.exports = (sequelize, DataTypes) => {    /*экспортируем ф-цию которая возвращает модель*/
  const User = sequelize.define( 'User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {                               /*можно и без validate*/
        is: NAME_PATTERN,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: NAME_PATTERN,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: LOGIN_PATTERN,
        len: [6, 16],                       /*размер от 6 до 16*/
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'passwordHash',
      set (value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue( 'password', bcrypt.hashSync( value, 10 ) );
      }
    }
  }, {} );

  User.associate = function (models) {
    User.hasMany( models.Task, {      /*hasMany - у юзера много тасков*/
      foreignKey: {
        field: 'userId',              /*UserId. этот внешний ключ находится в зависимой моделе - Task. И его указываем чтобы когда происходила выборка, это поле именовалось userId а не как по умолчанию - UserId*/
      },
      as: 'tasks'                     /*даем массиву с тасками псевдоним tasks и его используем в index.js в findAll*/
      /*as: {
       plural: 'task',                  //так указываем какой псевдоним брать - когда таски в единственном числе то task, когда во множественном то tasks
       singular: 'tasks'
       }*/
    } );
    User.belongsToMany(models.Role, {
      through: 'UserRoles',                          /*связь многие ко многим ЧЕРЕЗ таблицу UserRoles*/
    })
  };
  return User;
};

