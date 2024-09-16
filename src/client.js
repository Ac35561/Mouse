const { blueBright } = require('chalk');
const { Client, IntentsBitField, Collection } = require('discord.js');

const { token } = require('./client.json');

const { join } = require('path');
const { readdirSync } = require('fs');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildModeration,
		IntentsBitField.Flags.GuildMembers
	]
});

console.log(`${blueBright(`Attempting to login to the client.`)}`)
client.login(token);

const eventsPath = join(__dirname, 'events');
const eventsFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventsFiles) {
	const filePath = join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}