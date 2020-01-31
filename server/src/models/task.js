'use strict';

module.exports = (sequelize, DataTypes) => {

  const Task = sequelize.define( 'Task', {
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,

    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: new Date(),
      }
    },
  }, {} );

  Task.associate = function (models) {
    Task.belongsTo( models.User, {                  /*belongsTo - у таска один юзер*/
      foreignKey: {
        field: 'userId',
      },
      as: 'owner'                                     /*даем юзеру таска псевдоним owner и его используем в src/index.js в findAll*/

    } );
  };
  return Task;
};