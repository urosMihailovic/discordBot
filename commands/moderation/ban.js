const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { GuildBanManager } = require('discord.js');

async function banUserById(guild, userId) {
    const banManager = guild.bans;
    await banManager.create(userId, { reason: ''});
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whack')
        .setDescription('Select a member and whack them (ban).')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to whack (ban)')
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName('id')
                .setDescription('The id of the member to whack (ban)')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) { 
        const targetMember = interaction.options.getMember('target');
        const targetID = interaction.options.getString('id');

        if (targetID) {
            try {
                await banUserById(interaction.guild,targetID);
                await interaction.reply({content: `User with ID **${targetMember.user.tag}** has been whacked! `, ephemeral: true });
            } catch (error) {
                console.error(error);
                await interaction.reply({content: 'Uh oh, whack failed!', ephemeral: true });
            }
        } else {
            if (!targetMember) {
                await interaction.reply({content: "Gone already!", ephemeral: true });
                return;
            }

            try {
                await targetMember.ban({reason: ''});
                await interaction.reply({content: `**${targetMember.user.tag}** has been whacked! `, ephemeral: true });
            } catch (error) {
                console.error(error);
                await interaction.reply({content: 'Uh oh, whack failed!', ephemeral: true });
            }
        }
    },
};