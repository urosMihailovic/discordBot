const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hoooo')
		.setDescription('Replies with greeting!'),
	async execute(interaction) {
		const strings = [`There he is!`, `Ooooh, the mysterious stranger!!!`, `...hello...`,`Hello, beautiful people.`,`Look who it is!`];
		const randomString = [...strings][Math.floor(Math.random() * strings.length)];
		console.log(`Random String ${randomString}`)
		await interaction.reply(randomString);
	},
};