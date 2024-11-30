const fs = require('node:fs');
const timeDifferenceToString = require('./functions/timeDifferenceToString');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { token } = require('./config.json');
const techChannelId = '1265026925886308464'
const mainChannelId = '1182267947423645718'
const civilianId = '1241358927472492637'

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMembers, 
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
	]
 });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.GuildMemberAdd,  async (member) => {
	console.log(`${member.user.username} has joined!`);
	try {
		const techChannel = await member.guild.channels.fetch(techChannelId);
		const mainChannel = await member.guild.channels.fetch(mainChannelId);
		const user = member.user
		const pfpUrl = user.avatarURL({ size: 256, format: 'png' }) ?? "https://i.imgur.com/mOUw1l1.png"

		if (techChannel && mainChannel) {
			const role = member.guild.roles.cache.get(civilianId);
			try {
				await member.roles.add(role);
				console.log(`${member.user.tag} has joined and been assigned the ${role.name} role.`);
			} catch (error) {
				console.error("Failed to assign role:", error);
			}

			const timeAgo = timeDifferenceToString(user.createdAt)
			const formattedDate = `${user.createdAt.toLocaleDateString('en-US', {
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			  })}`;
			const description = `Look who it is\n${user}\n\n` +
								`**Created at**\n${formattedDate}\n`+
								`***Account age ${timeAgo}***`
			console.log(description);
			const embed = new EmbedBuilder()
			.setColor(0x61de2a)
			.setAuthor({
			  name: `${user.username}`,
			  iconURL: pfpUrl,
			})
			.setDescription(description)
			.setThumbnail(pfpUrl)
			.setFooter({ text: `20 years in the can` });
			
			await techChannel.send({embeds: [embed]});

			const filePath = path.join(__dirname, 'images', 'welcome_banner.png'); // Replace with your image path
    		const attachment = new AttachmentBuilder(filePath);
			await mainChannel.send({ files: [attachment] });
			await mainChannel.send({ content: `Welcome to 20 years in the can ${user}!`})
		}
    } catch (error) {
		console.error('Error fetching channel:', error);
	}
});

client.on(Events.GuildMemberRemove,  async (member) => {
	console.log(`${member.user.username} left!`);
	try {
		const techChannel = await member.guild.channels.fetch(techChannelId);
		const user = member.user 
		const pfpUrl = user.avatarURL({ size: 256, format: 'png' }) ?? "https://i.imgur.com/FkTru5t.png"

		try {
			await member.guild.members.fetch();
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Couldn\'t fetch members!', ephemeral: true });
		}

		if (techChannel) {
			const description = `${user} left the server!\n` +
			                    `*New member count is **${member.guild.members.cache.size}***`
			console.log(description);
			const embed = new EmbedBuilder()
			.setColor(0xff3131)
			.setAuthor({
			  name: `${user.username}`,
			  iconURL: pfpUrl,
			})
			.setDescription(description)
			.setThumbnail(pfpUrl)
			.setFooter({ text: `20 years in the can` });

			await techChannel.send({embeds: [embed]});
		}
    } catch (error) {
		console.error('Error fetching channel:', error);
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    // Check if the timeout status changed
    if (oldMember.communicationDisabledUntil !== newMember.communicationDisabledUntil) {
        // Check if the timeout was applied (i.e., user has been timed out)
        if (newMember.communicationDisabledUntil) {
            // Send a message to a specific channel reporting the timeout
            const reportChannel = await client.channels.fetch(techChannelId);
            if (reportChannel) {
                reportChannel.send(
                    `${newMember.user.tag} was timed out in ${newMember.guild.name} until ${newMember.communicationDisabledUntil}.`
                );
            }
        } else {
            // Member was unmuted (timeout ended)
            const reportChannel = await client.channels.fetch(techChannelId);
            if (reportChannel) {
                reportChannel.send(
                    `${newMember.user.tag}'s timeout has ended in ${newMember.guild.name}.`
                );
            }
        }
    }
});

client.login(token);