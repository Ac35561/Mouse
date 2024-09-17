const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pickone')
		.setDescription('The bot picks one of the options you give it.')
		.addStringOption(option =>
			option
				.setName('options')
				.setDescription('The options you want the bot to pick from. SEPARATED BY COMMAS (,)(e.g option1,option2,option3')
				.setRequired(true)),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const options = interaction.options.getString('options');
		const optionsTable = options.split(',')

		const selectedOptionNumber = Math.floor(Math.random() * optionsTable.length)
		const selectedOption = optionsTable[selectedOptionNumber];

		const optionEmbed = new EmbedBuilder()
			.setTitle('Your selected option is.....')
			.setDescription(selectedOption)
			.setColor('Green');

		await interaction.reply({
			embeds: [
				optionEmbed
			],
			ephemeral: true
		})
	}
}