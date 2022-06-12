const {Client, Intents} = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const Discord = require('discord.js');



const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

// Filters command files without .js and gets command files to execute
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Bot is ready
client.once('ready', () => {
  console.log('OverwatchBot is online!');
});

// Reads input of users and decifers their commands
client.on('messageCreate', async  messageCreate=>{
  if(!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return;

  const args = messageCreate.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command == 'stats'){
    if(args.length==3){
      client.commands.get('stats').execute(messageCreate, args, Discord);
    }else{
      messageCreate.channel.send('Error: Too Many or Not Enough Parameters, (must be: !stats Platform Region BattleTag)');
    }
  }
});

client.login('OTcxODYwMzM4NjA3ODA4NTQz.GRmyMu.dT-MRIuSO59TcmROFwfJdhp7Kd0YES3H5GawrA');
