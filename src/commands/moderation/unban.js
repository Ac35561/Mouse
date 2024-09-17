const { SlashCommandBuilder, CommandInteraction, EmbedBuilder, PermissionsBitField, GuildMember } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user from the guild.')
		.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The user you want to unban.')
				.setRequired(true))
			.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for the unban.')
				.setRequired(false)),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	async execute(interaction) {
		const targetMember = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') || 'No reason specified.';

		const unBanEmbed = new EmbedBuilder()
			.setTitle(`${targetMember.displayName} has been unbanned from the server.`)
			.setDescription(`Reason: ${reason}`)
			.setColor('Green')

		if (interaction.guild.bans.cache.get(targetMember.id)) {
			interaction.guild.bans.remove(targetMember.id, reason)

			await interaction.reply({
				embeds: [
					unBanEmbed
				],
				ephemeral: true
			});
		} else {
			const errorEmbed = new EmbedBuilder()
			.setTitle('Sorry, I cannot unban that user.')
			.setDescription('This is most likely because they aren\'t banned.')
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