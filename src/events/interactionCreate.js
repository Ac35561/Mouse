const { redBright } = require('chalk');
const { Events, BaseInteraction, InteractionType } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	/**
	 * 
	 * @param {BaseInteraction} interaction 
	 */
	async execute(interaction) {
		if (interaction.isChatInputCommand) {
			const command = interaction.client.commands.get(interaction.commandName);
			
			try {
				await command.execute(interaction);
			} catch (err) {
				console.error(`${redBright(`!![ERROR]!! -->`)} ${err}`);

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'Sorry, I encountered an error running this command. Please try again later.',
						ephemeral: true
					});
				} else {
					interaction.reply({
						content: 'Sorry, I encountered an error running this command. Please try again later.',
						ephemeral: true
					});
				}
			}
		}
	}
}