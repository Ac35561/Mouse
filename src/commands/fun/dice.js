const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Rolls a specificed amount of the selected dice.')
		.addStringOption(option =>
		option
			.setName('dice-type')
			.setDescription('The type of dice you want to roll.')
			.setRequired(true)
			.addChoices([
				{
					name: 'd4',
					value: '1'
				},
				{
					name: 'd6',
					value: '2'
				},
				{
					name: 'd8',
					value: '3'
				},
				{
					name: 'd12',
					value: '4'
				},
				{
					name: 'd20',
					value: '5'
				},
				{
					name: 'd100',
					value: '6'
				}
			]))
		.addNumberOption(option =>
			option
				.setName('amount')
				.setDescription('The amount of dice you want to roll.')),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const type = interaction.options.getString('dice-type');
		const amount = interaction.options.getNumber('amount') || 1;

		const rolledNumbers = []

		switch (type) {
			case '1':
				for (i = 0; i < amount; i++) {
					let output = Math.floor(Math.random() * 4) + 1

					rolledNumbers.push(output)
				}
				break;
			case '2':
				for (i = 0; i < amount; i++) {
					let output = Math.floor(Math.random() * 6) + 1

					rolledNumbers.push(output)
				}
				break;
			case '3':
				for (i = 0; i < amount; i++) {
					let output = Math.floor(Math.random() * 8) + 1

					rolledNumbers.push(output)
				}
				break;
			case '4':
				for (i = 0; i < amount; i++) {
					let output = Math.floor(Math.random() * 12) + 1

					rolledNumbers.push(output)
				}
				break;
			case '5':
				for (i = 0; i < amount; i++) {
					let output = Math.floor(Math.random() * 20) + 1

					rolledNumbers.push(output)
				}
				break;
			case '6':
				for (i = 0; i < amount; i++) {
					let output = Math.floor(Math.random() * 100) + 1

					rolledNumbers.push(output)
				}
				break;
		}

		function getRolledTotal(rolledArray) {
			let total = 0
			for (number of rolledArray) {
				total = total + Number(number)
			}

			return total;
		}

		const diceEmbed = new EmbedBuilder()
			.setTitle('Dice results')
			.setDescription(`Rolled: [${rolledNumbers.join(', ')}]\n\nTotal: ${getRolledTotal(rolledNumbers)}`)
			.setColor('Green')

		await interaction.reply({
			embeds: [
				diceEmbed
			],
			ephemeral: true
		})
	}
}