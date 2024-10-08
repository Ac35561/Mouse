const { Message, Events  } = require('discord.js');

const { con } = require('../mysql/MySql.js');

/**
 * Creates a random number between two specified numbers. Used to generate new experiance amounts.
 * @returns {number}
 */
function generateExp() {
	const min = 3;
	const max = 9;

	const expAmount = Math.floor(Math.random() * max) + min

	return expAmount
}

module.exports = {
	name: Events.MessageCreate,
	once: false,
	/**
	 * 
	 * @param {Message} message 
	 */
	execute(message) {
		if (message.author.bot) {
			return;
		}

		// Handle global exp.
		con.query(`SELECT * FROM global_experiance WHERE userid='${message.author.id}'`, (err, rows) => {
			if (err) {
				throw err;
			}

			if (!message.client.gExpCooldown.get(message.author.id)) {
				if (rows.length == 0) {
					const newExp = generateExp();
	
					con.query(`INSERT INTO global_experiance(userid, experiance) VALUES('${message.author.id}', '${newExp}')`);
				} else {
					const newExp = generateExp();
					const currentExp = Number(rows[0].experiance);

					const modifier = Number(rows[0].modifier);

					const totalExp = Math.round((newExp * modifier) + currentExp);

					con.query(`UPDATE global_experiance SET experiance='${totalExp}' WHERE userid='${message.author.id}'`);
				}

				message.client.gExpCooldown.set(message.author.id, 1);
					setTimeout(() => {
						message.client.gExpCooldown.delete(message.author.id)
					}, 10000)
			}
		});

		// Handle server exp.
		con.query(`SELECT * from server_experiance WHERE userid='${message.author.id}' AND serverid='${message.guild.id}'`, (err, rows) => {
			if (err) {
				throw err;
			}

			con.query(`SELECT * FROM server_configs WHERE serverid='${message.author.id}'`, (err, rows2) => {
				if (rows2.length == 0 || rows2[0].experianceenabled == 1) {
					if (rows.length == 0) {
						const newExp = generateExp();
		
						con.query(`INSERT INTO server_experiance(userid, serverid, experiance) VALUES('${message.author.id}', '${message.guild.id}', '${newExp}')`);
					} else {
						const newExp = generateExp();
						const currentExp = Number(rows[0].experiance);
		
						const modifier = Number(rows[0].modifier);
		
						const totalExp = Math.round((newExp * modifier) + currentExp);
		
						con.query(`UPDATE server_experiance SET experiance='${totalExp}' WHERE userid='${message.author.id}' AND serverid='${message.guild.id}'`);
					}
				} else {
					return;
				}
			})
		})
	}
}