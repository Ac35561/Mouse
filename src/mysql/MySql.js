const { createConnection } = require('mysql2');

const { database, host, password, username } = require('./mysql.json');

const con = createConnection({
	host: host,
	database: database,
	user: username,
	password: password
});

module.exports = {
	con: con
}