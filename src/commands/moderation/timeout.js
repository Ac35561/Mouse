const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, GuildMember } = require('discord.js');

/**
 * Transfers minutes into milliseconds.
 * @param {number} minutes
 * @returns {number} milliseconds
 */
function minutesToMilliseconds(minutes) {
	return minutes * 60000;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeout a user for a specified amount of minutes in the guild.')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The user you want to kick.')
				.setRequired(true))
		.addNumberOption(option =>
		option
			.setName('duration')
			.setDescription('The duration of the timeout in minutes.')
			.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for the timeout.')
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
		const durationMinutes = interaction.options.getNumber('duration');
		const reason = interaction.options.getString('reason') || 'No reason specified.'

		const durationMilliseconds = minutesToMilliseconds(durationMinutes);

		const timeoutEmbed = new EmbedBuilder()
			.setTitle(`${targetMember.user.displayName} has been timed out.`)
			.setDescription(`Reason: ${reason}\nDuration: ${durationMinutes} minutes.`)
			.setColor('Red')

		if (targetMember.kickable) {
			targetMember.timeout(durationMilliseconds, reason)

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