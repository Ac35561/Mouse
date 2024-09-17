const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user from the guild.')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The user you want to ban.')
				.setRequired(true))
			.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for the ban.')
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
			await interaction.reply({
				embeds: [
					banEmbed
				],
				ephemeral: true
			});
			
			targetMember.ban({
				reason: reason
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