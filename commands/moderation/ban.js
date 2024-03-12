const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whack')
        .setDescription('Select a member and whack them (ban).')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to whack (ban)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) { 
        const targetMember = interaction.options.getMember('target');

        if (!targetMember) {
            await interaction.reply({content: "Gone already!", ephemeral: true });
            return;
        }

        try {
            await targetMember.ban({reason: 'Because!'});
            await interaction.reply({content: `**${targetMember.user.tag}** has been whacked! `, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Uh oh, whack failed!', ephemeral: true });
        }
    },
};