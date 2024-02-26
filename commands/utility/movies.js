const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
 data: new SlashCommandBuilder()
     .setName('pick-movie')
     .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
     .setDescription('Picks a movie out of the inputed ones!')
     .addStringOption(option =>
         option.setName('movies')
             .setDescription('Movies from which to pick. Separate them with a , (comma)! Example: Goodfellas, Shining, Circles')
             .setRequired(true)),
 async execute(interaction) { 
     const input = interaction.options.getString('movies')
     const delimiter = ","
     const strings = input.split(delimiter).filter(Boolean)
	 if (strings.length == 0) {
		await interaction.reply({ content: 'There was an error with the input movies!', ephemeral: true })
		return;
	 }
     const randomString = [...strings][Math.floor(Math.random() * strings.length)];
     const result = `The winner is - ${randomString} :tada:`
     console.log(result)
	 await interaction.reply(result)
 }
};
