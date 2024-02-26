const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');

module.exports = {
	cooldown: 3,
	data: new SlashCommandBuilder()
		.setName('hooo')
		.setDescription('Replies with greeting!'),
	async execute(interaction) {
		const greetings = [`There he is!`, `Ooooh, the mysterious stranger!!!`, `...hello...`,`Hello, beautiful people.`,`Look who it is!`];
		const randomString = [...greetings][Math.floor(Math.random() * greetings.length)];
		console.log(`Random String ${randomString}`)
		await interaction.reply(randomString);
	},
};