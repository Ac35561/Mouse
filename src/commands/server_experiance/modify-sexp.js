const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, User } = require('discord.js');
const { con } = require('../../mysql/MySql.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modify-sexp')
		.setDescription('Edits another users server experiance or modifier.')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The user you want to modify.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('action')
				.setDescription('The action you want to take.')
				.setRequired(true)
				.setChoices([
					{
						name: 'View Experiance/Modifier',
						value: '0'
					},
					{
						name: 'Set Experiance',
						value: '1'
					},
					{
						name: 'Set Modifier',
						value: '2'
					}
				]))
		.addNumberOption(option =>
			option
				.setName('new-value')
				.setDescription('The new value for your selected action.')
				.setRequired(false)),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		/**
		 * @type {User}
		 */
		const target = interaction.options.getUser('target');
		const action = interaction.options.getString('action');
		const newValue = interaction.options.getNumber('new-value') || 0;

		con.query(`SELECT modifier, experiance FROM server_experiance WHERE userid = '${target.id}' AND serverid = '${interaction.guild.id}'`, async (err, rows) => {
			if (err) {
				throw err;
			}

			if (rows.length == 0) {
				con.query(`INSERT INTO server_experiance(userid, serverid, experiance) VALUES('${target.id}', '${interaction.guild.id}', '0')`);

				await interaction.reply({
					content: 'That user did not have saved experiance, data has been created please run the command again.',
					ephemeral: true
				});

				return;
			}

			const userModifier = Number(rows[0].modifier);
			const userExperiance = Number(rows[0].experiance);

			const actionEmbed = new EmbedBuilder();

			switch(action) {
				case '0':
				actionEmbed
					.setTitle(`${target.displayName}'s current server experiance.`)
					.setDescription(`Current Exp: ${userExperiance}\nCurrent Modifier: ${userModifier}`)
					.setColor('Gold')
					break;
				
				case '1':
					con.query(`UPDATE server_experiance SET experiance='${newValue}' WHERE userid='${target.id}' AND serverid='${interaction.guild.id}'`);
					
					actionEmbed
						.setTitle(`Successfully updated ${target.displayName}'s server experiance.`)
						.setDescription(`Set their experiance to: ${newValue}`)
						.setColor('Gold')
					break;
				
				case '2':
				con.query(`UPDATE server_experiance SET modifier='${newValue}' WHERE userid='${target.id}' AND serverid='${interaction.guild.id}'`);
					
					actionEmbed
						.setTitle(`Successfully updated ${target.displayName}'s server experiance modifier.`)
						.setDescription(`Set their experiance to: ${newValue}`)
						.setColor('Gold')
					break;
			}

			await interaction.reply({
				embeds: [
					actionEmbed
				],
				ephemeral: true
			});
		});
	}
}