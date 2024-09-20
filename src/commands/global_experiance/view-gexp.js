const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const { con } = require('../../mysql/MySql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view-gexp')
		.setDescription('Views your current global experiance and modifier.'),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		con.query(`SELECT modifier, experiance FROM global_experiance WHERE userid = '${interaction.user.id}'`, async (err, rows) => {
			if (err) {
				throw err;
			}

			const experianceEmbed = new EmbedBuilder()
				.setTitle(`${interaction.user.displayName}'s current global experiance.`)
				.setDescription(`Current Exp: ${rows[0].experiance}\nCurrent Modifier: ${rows[0].modifier}`)
				.setColor('Gold');

			await interaction.reply({
				embeds: [
					experianceEmbed
				],
				ephemeral: true
			})
		});
	}
}