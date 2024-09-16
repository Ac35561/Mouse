const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Gets the current ping of the bot.'),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const pingEmbed = new EmbedBuilder()
			.setTitle('Mouse\'s Ping')
			.setDescription(`${Math.floor(interaction.client.ws.ping)}ms`)
			.setColor('Blue');

		await interaction.reply({
			embeds: [
				pingEmbed
			],
			ephemeral: true
		})
	}
}