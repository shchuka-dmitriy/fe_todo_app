'use strict';
import { ROLE } from '../constants';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define( 'Role', {
    name: {
      type: DataTypes.ENUM( ...Object.values( ROLE ) ),
      allowNull: false,
      unique: true
    }
  }, {} );
  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsToMany(models.User,{
      through: 'UserRoles'                          /*связь многие ко многим ЧЕРЕЗ таблицу UserRoles*/
    })
  };
  return Role;
};