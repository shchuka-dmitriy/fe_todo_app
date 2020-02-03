'use strict';
import { ROLE } from '../../constants';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable( 'Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM( ...Object.values( ROLE ) ),
        unique: true,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'Roles' );
  }
};