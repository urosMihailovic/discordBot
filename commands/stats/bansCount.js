const { SlashCommandBuilder, PermissionFlagsBits, AuditLogEvent } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('whacks')
    .setDescription('Number of whacked members.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    try {
      const bans = await interaction.guild.fetchAuditLogs({type: AuditLogEvent.MemberBanAdd, user: interaction.user});
      const count = bans.entries.size
      const plural = count > 1
      await interaction.reply(`You whacked ${count} member${plural ? "s" : ""}!🍷`);
    } catch (error) {
      console.error(error);
      await interaction.reply('Failed to retrieve ban information.');
    }
  },
};