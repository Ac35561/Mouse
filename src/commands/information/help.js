const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Gets a list of the bot\'s commands.'),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const helpEmbed = new EmbedBuilder()
			.setTitle('Help Menu')
			.setColor('Blue')
			.addFields(
				{
					name: 'Information',
					value: '</help:1285450484752056380> | </ping:1285365641292939264> | </support:1285450066965958717>'
				},
				{
					name: 'Moderation',
					value: '</kick:1285372297942929419> | </ban:1285375575027879978> | </unban:1285377872688578634> | </timeout:1285380939362336883> | </untimeout:1285383499603251212>'
				},
				{
					name: 'Fun',
					value: '</dice:1285388128252592138> | </pickone:1285445691874738266>'
				}
			)

		await interaction.reply({
			embeds: [
				helpEmbed
			],
			ephemeral: true
		})
	}
}