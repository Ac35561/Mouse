const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const { con } = require('../../mysql/MySql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('view-sexp')
		.setDescription('Views your current experiance and modifier in the current guild.'),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		con.query(`SELECT modifier, experiance FROM server_experiance WHERE userid = '${interaction.user.id}' AND serverid = '${interaction.guild.id}'`, async (err, rows) => {
			if (err) {
				throw err;
			}

			const experianceEmbed = new EmbedBuilder()
				.setTitle(`${interaction.user.displayName}'s current server experiance.`)
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