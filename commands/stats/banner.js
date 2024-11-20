const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require('discord.js');
const path = require('path');
const techChannelId = '1265026925886308464'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('Used for testing banner')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    try {    
    const filePath = path.join(__dirname, ']]images', 'welcome_banner.png'); // Replace with your image path
    const attachment = new AttachmentBuilder(filePath);
    
    // Send the image in the channel where the command was invoked
    await interaction.reply({ content: 'Here is your image!', files: [attachment] });
    } 
    catch (error) {
      console.error(error);
      await interaction.reply('Failed to retrieve ban information.');
    }
  }, 
};