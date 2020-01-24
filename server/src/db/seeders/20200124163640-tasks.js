'use strict';
const moment = require( 'moment' );

/**
 *
 * @param {Array<>} users
 * @returns {[]}
 */
function generateTasks (users) {              //ф-ция будет генерировать массив из объектов Таскс
  const tasks = [];
  for (let i = 0; i < users.length; i++) {
    const taskCount = Math.round( Math.random() * 10 );
    for (let j = 0; j < taskCount; j++) {
      tasks.push( {
                    userId: users[i].id,
                    isDone: Math.random() < 0.5,         //рандомно будет выдавать условие: Math.random() возвр число от 0 до 1 и сравниваем его с 0.5 и выдается либо true либо false
                    value: `User#${users[i].id} task value #${j + 1}`,
                    // deadline: moment(`2020-${1 + Math.round(Math.random())}-${20 + Math.round(Math.random() * 10)}`, 'YYYY-M-D').toDate(),      //рандомим месяц и число. Задаем формат. И конвертируем в дату
                    deadline: moment( '2020-01-20' ).set( 'day', Math.round( Math.random() * 10 ) ).toDate(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                  } );
    }
  }
  return tasks;
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.query(
      'SELECT id FROM "Users"' )     //возвр промис. Это делаем для получения значения поля id из Users
                         .then(    //обрабатываем и возвр промис снова
                                   ([results, metadata]) => {

                                     return queryInterface.bulkInsert(
                                       'Tasks', generateTasks( results ),
                                       {}
                                     );   //ретернится этот ретурн. В results все юзеры передаются в generateTasks

                                   }
                         );

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete( 'Tasks ', null, {} );

  }
};
