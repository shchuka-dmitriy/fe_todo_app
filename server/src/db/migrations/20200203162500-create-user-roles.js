'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {                                     /*up - овечает за создание действий*/
    return queryInterface.createTable(
      {
        schema: 'public',
        tableName: 'UserRoles'
      }, {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {                         /*указываем, что зависит от, т.к. это внешний ключ*/
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'                   /*значит что удалять нельзя. но это не точно!!*/
        },
        roleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Roles',
            key: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      } ).then( (value) => {
      return queryInterface.addConstraint('UserRoles', ['userId', 'roleId'], {      /*addConstraint - добавляем ...????*/
        type: 'primary key'
      });
    } );
  },
  down: (queryInterface, Sequelize) => {                                     /*down - отвечает за отмену/откат действий*/
    return queryInterface.dropTable( 'UserRoles' );
  }
};