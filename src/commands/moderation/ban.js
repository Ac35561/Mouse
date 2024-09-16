const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user from the server.')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
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

		const banEmbed = new EmbedBuilder()
			.setTitle(`${targetMember.user.displayName} has been banned from the server.`)
			.setDescription(`Reason: ${reason}`)
			.setColor('Red')

		if (targetMember.bannable) {
			targetMember.ban({
				reason: reason
			});

			await interaction.reply({
				embeds: [
					banEmbed
				],
				ephemeral: true
			});
		} else {
			const errorEmbed = new EmbedBuilder()
			.setTitle('Sorry, I cannot ban that user.')
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