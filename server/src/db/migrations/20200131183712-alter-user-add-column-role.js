/*специальная миграция для внесения изменения в другую миграцию*/

'use strict';

import { ROLE } from '../../constants';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn( 'Users', 'role', {
      type: Sequelize.ARRAY( Sequelize.ENUM( ...Object.values(ROLE) ) ),
      defaultValue: [ROLE.USER],
      allowNull: false
    } );

  },


  hjkhjk

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Users', 'role' );

  }
};
