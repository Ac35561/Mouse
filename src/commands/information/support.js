const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

const { supportGuild } = require('../../invites.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Get an invite to the support guild'),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const supportEmbed = new EmbedBuilder()
			.setTitle('Support Guild')
			.setDescription(`You can join the support guild here: ${supportGuild}`)
			.setColor('Blue');

		await interaction.reply({
			embeds: [
				supportEmbed
			],
			ephemeral: true
		})
	}
}