require( 'dotenv/config' );					//для того чтобы взять переменные окружения из файла .env. Переменные окружения прописаны ниже process.env.DB_USER и т.д.

module.exports = {
	development: {
	username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		migrationStorage: "json",			//для того чтобы не было таблички SequelizeMeta, а инфа о миграциях и т.д. хранилась бы в json. Нужно чтоб если ктонибудь будет не через sequelize с проектом работать
		seederStorage: "json"				//для того чтобы не было таблички SequelizeMeta, а инфа о сидах и т.д. хранилась бы в json
},
	test: {},
	production: {}
};