const { SlashCommandBuilder,  EmbedBuilder, PermissionFlagsBits } = require('discord.js');

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
     const result = [...strings][Math.floor(Math.random() * strings.length)];
	 
	 const embed = new EmbedBuilder()
	 .setColor(0x000000)
	 .setDescription(`*The winner is*\n\n**${result}**\n`)
	 .setThumbnail('https://i.imgur.com/bLwD7dU.png')
	 .setFooter({ text: `Enjoy watching!`})

     console.log(`The *winner* is - ${result}`)
	 await interaction.reply({ embeds: [embed] });
 }
};
