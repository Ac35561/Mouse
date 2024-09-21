const { Events, Guild } = require('discord.js');

const { con } = require('../mysql/MySql.js');

module.exports = {
	name: Events.GuildDelete,
	once: false,
	/**
	 * 
	 * @param {Guild} guild 
	 */
	execute(guild) {
		con.query(`SELECT * FROM server_configs WHERE serverid='${guild.id}'`, (err, rows) => {
			if (err) {
				throw err;
			}

			if (rows.length != 0) {
				con.query(`DELETE FROM server_configs WHERE serverid='${guild.id}'`);
			} else {
				return;
			}
		})
	}
}