const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms'); // for parsing duration

module.exports = {
	data: new SlashCommandBuilder()
	  .setName('throw-in-can')
	  .setDescription('Timeout a member for a specified duration (in minutes, hours, days).')
	  .addUserOption(option =>
		option
		  .setName('target')
		  .setDescription('The member to timeout.')
		  .setRequired(true))
	  .addStringOption(option =>
		option
		  .setName('duration')
		  .setDescription('The timeout duration (e.g., 30m, 2h, 1d).')
		  .setRequired(true))
	  .addStringOption(option => // Optional reason
		option
		  .setName('reason')
		  .setDescription('Reason for the timeout (optional).'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
	  const targetMember = interaction.options.getMember('target');
	  const durationString = interaction.options.getString('duration');
	  const reason = interaction.options.getString('reason') || 'No reason provided.';
  
	  if (!targetMember) {
		await interaction.reply({ content: 'Uh oh, you selected an invalid target!', ephemeral: true });
		return;
	  }
  
	  try {
		const duration = ms(durationString); // Parse duration
  
		if (duration === 0) { // Check for duration of 0
		  await targetMember.timeout(null); // Set timeout to null to cancel
		  await interaction.reply({ content: `**${targetMember.user.tag}** has been let out of can.`, ephemeral: true });
		} else if (!duration || duration > ms('28d')) {
		  return await interaction.reply({ content: 'Invalid can time. Please use a format like 30m, 2h, or 1d (max 28 days).', ephemeral: true });
		} else {
		  await targetMember.timeout(duration, reason);
		  await interaction.reply({ content: `**${targetMember.user.tag}** has been put in can for ${durationString}.`, ephemeral: true });
		}
	  } catch (error) {
		console.error(error);
		if (error.code === 50001) { // Missing Permissions
		  await interaction.reply({ content: 'I don\'t have permissions to timeout members!', ephemeral: true });
		} else {
		  await interaction.reply({ content: 'Uh oh, timeout failed!', ephemeral: true });
		}
	  }
	},
  };