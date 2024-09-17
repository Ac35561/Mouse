const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('untimeout')
		.setDescription('Untimeout a user in the guild.')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The user you want to untimeout.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for the untimeout.')
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
		const reason = interaction.options.getString('reason') || 'No reason specified.'

		const timeoutEmbed = new EmbedBuilder()
			.setTitle(`${targetMember.user.displayName} has been untimed out.`)
			.setDescription(`Reason: ${reason}`)
			.setColor('Green')

		if (targetMember.kickable) {
			targetMember.timeout(null, reason)

			await interaction.reply({
				embeds: [
					timeoutEmbed
				],
				ephemeral: true
			});
		} else {
			const errorEmbed = new EmbedBuilder()
				.setTitle('Sorry, I cannot timeout that user.')
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