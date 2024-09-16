const { greenBright } = require('chalk');
const { Client, Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	/**
	 * 
	 * @param {Client} client 
	 */
	execute(client) {
		console.log(`${greenBright(`Successfully logged into the client! User ID: ${client.user.id}`)}`);
		client.user.setActivity({
			name: 'for commands.',
			type: ActivityType.Watching
		})
	}
}