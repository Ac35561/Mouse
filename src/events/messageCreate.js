const { Message, Events  } = require('discord.js');

const { con } = require('../mysql/MySql.js');

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
		})
	}
}