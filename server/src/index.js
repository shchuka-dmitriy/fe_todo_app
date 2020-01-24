/*
 import { User, sequelize } from './db/models';
 import { Model, DataTypes } from 'sequelize';
 import moment from 'moment';

 /!*
 const bcrypt = require('bcrypt');

 /!*
 * createUser
 * getUserById
 * updateUser
 * deleteUser
 * *!/

 const hashPassword = async (password) => {
 try {
 return bcrypt.hash(password, 10);
 } catch (e) {
 throw e;
 }
 };

 const createUser = async (data) => {
 try {
 data.passwordHash = await hashPassword(data.password);

 const createdUser = await User.create(data);
 if (createdUser) {
 return createdUser.get();
 }
 throw new Error();

 } catch (e) {
 throw e;
 }
 };

 const getUserById = async (userId) => {
 try {
 const getUser = await User.findByPk(userId);
 return getUser.get();
 } catch (e) {
 throw e;
 }
 };



 /!*createUser({
 firstName: 'Name',
 lastName: 'Surname',
 email: 'test13@gmail.com',
 login: 'test_test13',
 password: 'test123456'
 })
 .then(console.log)
 .catch(console.err);*!/

 getUserById(1)
 .then(console.log)
 .catch(console.err);*!/

 class Task extends Model {


 }

 Task.init({
 value: {
 type: DataTypes.STRING,
 allowNull: true,
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
 isDone: {
 type: DataTypes.BOOLEAN,
 defaultValue: false,
 allowNull: false
 }
 },

 {
 sequelize,
 timestamps: true
 });

 Task.belongsTo(User);
 User.hasMany(Task);*/


/*
 import { User, sequelize } from './db/models' ;

 User.findAll( {} ).then( data => console.log( data.map( user => user.toJSON() ) ) );*/


import { User, Task } from './db/models';
import Sequelize      from 'sequelize';

const Op = Sequelize.Op;									//для запросов. Почитать на sequelize.org/v5/manual ...

async function getTasksWithOwners () {
  try {
    const tasks = await Task.findAll(
      {
				limit: 10,
        where: {
          isDone: true
        },
				id: {
					[Op.between]: [400,500]					//дополнительные options к выборке
				},
        include: [
          {
            model: User,
            as: 'owner'													//выводим как owner (владелец таски). Этот псевдоним мы дали юзеру в models/user.js
          }]
      } );
    return tasks.map( task => task.get() );
  } catch (e) {

  }
}

async function getUsersWithTasks () {
  try {
    const result = await User.findAll( {
                                         limit: 10,
                                         attributes: {
                                           exclude: ['password']			//вывести без поля password
                                         },
                                         include: [
                                           {
                                             model: Task,							//включая модель Task будут выводиться и таски у юзеров. Без этого поле Tasks у юзеров выводиться не будет
                                             as: 'tasks'
                                           }
                                         ]
                                       } );

    return result.map( item => item.get() );
  } catch (e) {

  }
}

// getUsersWithTasks()
//   .then( console.log );


getTasksWithOwners()
  .then( console.log );