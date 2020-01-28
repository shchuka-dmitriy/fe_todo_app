/*--  Это Сервер  --*/

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

/*
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
 .then( console.log );*/

/*
 //транзакции
 import { CreditCard, sequelize } from './db/models';

 async function transaction (fromCardId, toCardId, value) {
 try {

 const fromCard = await CreditCard.findByPk( fromCardId );
 const toCard = await CreditCard.findByPk( toCardId );

 console.group( 'BEFORE' );
 console.log( fromCard.get() );
 console.log( toCard.get() );
 console.groupEnd();

 const t = await sequelize.transaction();

 fromCard.balance -= value;
 const updatedFromCard = await fromCard.save( {
 transaction: t,
 } );

 toCard.balance += value;
 const updatedToCard = await toCard.save( {
 transaction: t,
 } );

 await t.commit();

 console.group( 'AFTER' );
 console.log( updatedFromCard.get() );
 console.log( updatedToCard.get() );
 console.groupEnd();

 } catch (e) {
 console.error( e );
 }
 }

 transaction( 1, 2, 100 );*/

/*
 //СЕРВЕР!. работа с express. Примеры запросов.
 import express  from 'express';
 import { User } from './db/models';

 const app = express();              //ф-ция создает экземпяер сервера. app - сервер
 const PORT = process.env.PORT || 5000;                 //process.env.PORT - значение порта из файла .env

 app.use( express.json() );            //подключили, чтобы могли парсить json из body

 app.get( '/'/!* запрос в корень сервака *!/,
 (req, res)/!* ф-ция промежуточной обработки *!/ => res.send( 'Hello World! Hi' )
 );   //тут как обрабатывать get-запрос

 app.post( '/user'/!* запрос на юзера *!/, async (req, res, next) => {
 try {
 // console.log(req.body);

 const createdUser = await User.create( req.body );

 res.send( createdUser );

 } catch (e) {
 next(e);
 }
 } );

 app.use( (err, req, res) => {
 res.status( 500 ).send( 'Something broken!' );
 } );

 app.listen( PORT, () => console.log( `Example app listening on port ${PORT}!` ) );*/

//СЕРВЕР!. работа с express2 с роутером.
import express      from 'express';
import router       from './routes';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use( express.json() );
app.use( router );                  //кидаем на основной роутер, а он перенаправляет на другие под-роутеры
router.use(errorHandler);

app.listen( PORT, () => console.log( `Example app listening on port ${PORT}!` ) );