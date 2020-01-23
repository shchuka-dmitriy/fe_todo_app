import { User, sequelize } from './db/models';
import { Model, DataTypes } from 'sequelize';
import moment from 'moment';

/*
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
	.catch(console.err);*/

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
User.hasMany(Task);