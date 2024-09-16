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