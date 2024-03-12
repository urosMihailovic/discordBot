const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('count') // More descriptive command name
    .setDescription('Counts the number of members with a specific role.')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to count members for.')
        .setRequired(true)),
  async execute(interaction) {
    const role = interaction.options.getRole('role');

    if (interaction.guild.members.cache.size < 2000) {
        try {
            await interaction.guild.members.fetch();
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Couldn\'t fetch members!', ephemeral: true });
        }
    }

    const roleMembers = interaction.guild.members.cache.filter(member => member.roles.cache.has(role.id));
    const memberCount = roleMembers.size;

    const memberString = memberCount === 1 ? 'member' : 'members';
    await interaction.reply(`**${role.name}** has **${memberCount}** ${memberString}.`);
  },
};