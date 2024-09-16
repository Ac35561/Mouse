const { blueBright, yellowBright } = require('chalk');
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

client.commands = new Collection();

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

const commandsFoldersPath = join(__dirname, 'commands');
const commandsFolders = readdirSync(commandsFoldersPath);

for (const folder of commandsFolders) {
	const folderPath = join(commandsFoldersPath, folder);
	const folderFiles = readdirSync(folderPath);

	for (const file of folderFiles) {

		const filePath = join(folderPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`${yellowBright(`Encountered an error registering a slash command. The slash command located at ${filePath} is missing required properties.`)}`);
		}
	}
}