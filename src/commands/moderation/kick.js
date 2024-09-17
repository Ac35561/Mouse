const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionFlagsBits, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member from the guild.')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.addUserOption(option =>
		option
			.setName('target')
			.setDescription('The user you want to kick.')
			.setRequired(true))
		.addStringOption(option =>
		option
			.setName('reason')
			.setDescription('The reason for the kick.')
			.setRequired(false)),
	/**
	 * 
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		/**
		 * @type {GuildMember} 
		 */
		const targetMember = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason') || 'No reason specified.';

		const kickEmbed = new EmbedBuilder()
			.setTitle(`${targetMember.displayName} has been kicked from the server.`)
			.setDescription(`Reason: ${reason}`)
			.setColor('Red')

		if (targetMember.kickable) {
			targetMember.kick(reason);

			await interaction.reply({
				embeds: [
					kickEmbed
				],
				ephemeral: true
			});
		} else {
			const errorEmbed = new EmbedBuilder()
			.setTitle('Sorry, I cannot kick that user.')
			.setDescription('This is most likely because they have a higher role then me.')
			.setColor('Red');

			await interaction.reply({
				embeds: [
					errorEmbed
				],
				ephemeral: true
			});
		}
	}
}

/**

*/