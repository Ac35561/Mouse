const env = "dev";

const { greenBright, redBright, yellowBright, blueBright } = require('chalk');
const { REST, Routes } = require('discord.js');

const { clientId, developmentGuildId, token } = require('./client.json');

const { join } = require('path');
const { readdirSync } = require('fs');

const commands = [];

const commandsFoldersPath = join(__dirname, 'commands');
const commandsFolders = readdirSync(commandsFoldersPath);

for (const folder of commandsFolders) {
	const folderPath = join(commandsFoldersPath, folder);
	const folderFiles = readdirSync(folderPath);

	for (const file of folderFiles) {

		const filePath = join(folderPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`${yellowBright(`Encountered an error registering a slash command. The slash command located at ${filePath} is missing required properties.`)}`);
		}
	}
}

const rest = new REST()
	.setToken(token);

(async () => {
	try {
		console.log(`${blueBright(`Started refreshing ${commands.length} slash command(s).`)}`);

		if (env == "dev") {
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, developmentGuildId),
				{
					body: commands
				}
			);
		} else {
			const data = await rest.put(
				Routes.applicationCommands(clientid),
				{
					body: commands
				}
			);
		}

		console.log(`${greenBright(`Successfully reloaded ${commands.length} slash command(s).`)}`);
	} catch (err) {
		console.error(`${redBright(`!![ERROR]!! -->`)} ${err}`);
	}
})();