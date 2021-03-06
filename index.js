const Discord = require('discord.js');

const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const prefix = process.env.BOT_PREFIX;

client.on('message', (message) => {
  if (message.content === 'help') {
    message.channel.send(`The bot prefix for this server is ${prefix}\nType \`${prefix}help\``);
  }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    const embed = new Discord.MessageEmbed().setTitle('Bot Commands list:').setColor(0x43bcfe).setDescription(`.ping
ping
.server
.moreinfo
.userinfo
.quoteme
.argsinfo`);
    message.channel.send(embed);
  } else if (command === 'ping') {
    message.channel.send('Pong');
  } else if (message.content === 'ping') {
    message.channel.send('Talk with me in dots');
  } else if (command === 'server') {
    message.channel.send(
      `Server details:\nName : ${message.guild.name}\nType \`${prefix}moreinfo\` for more information`,
    );
  } else if (command === 'moreinfo') {
    message.channel.send(`Server details:
Name : ${message.guild.name}
Name Acronym: ${message.guild.nameAcronym}
Total Members: ${message.guild.memberCount}
Created At: ${message.guild.createdAt}
Region: ${message.guild.region}
`);
  } else if (command === 'userinfo') {
    message.channel.send(`Your Username: ${message.author.username}\nYour ID: ${message.author.id}`);
  } else if (command === 'quoteme') {
    message.channel.send(`\`${message.content.substring(9)}\``);
  } else if (command === 'argsinfo') {
    if (!args.length) {
      return message.channel.send("You didn't provide any arguments");
    }
    message.channel.send(`Command name: ${command}
Arguments: ${args}
Argument array length: ${args.length}
First Argument: ${args[0]}`);
  }
});
