const Discord = require('discord.js');
const updateLeaderboard = require('./helpers/updateLeaderboard');
//Pollute global scope because lazy
global.config = require('./config.json');
global.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] });
global.leaderboard = require('./database.json');
global.matches = config.matches;
global.queue = [];
global.award = { "winners": [], "kills": "", "caps": "", "noshows": [] };
global.nMatch = config.nextMatch;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(config.status);
    global.genChannel = client.channels.cache.get(config.genChannel);
    global.pointsChannel = client.channels.cache.get(config.pointsChannel);
    global.guild= await client.guilds.fetch(config.guild);
    updateLeaderboard();
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.id == process.env.BOT_ID) return;

    let args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(1).toLowerCase();
    args.shift();
    const isStaff = message.member.roles.cache.some(role => role.name === 'League Staff');

    switch(cmd){
        case 'join':
            require('./commands/join.js')(message);
            break;
        case 'leave':
            require('./commands/leave.js')(message);
            break;
        case 'players':
            require('./commands/players.js')(message);
            break;
        case 'next':
            require('./commands/next.js')(message);
            break;
        case 'test':
            require('./commands/test.js')(message);
            break;
        case 'notify':
            require('./commands/notify.js')(message);
            break;
        case 'register':
            require('./commands/register')(message);
            break;
        case 'times':
            if (message.author.id !== config.annaId) { break; }
            require('./commands/times')(message);
            break;
        case 'reset':
            if (message.author.id !== config.annaId) { break; }
            leaderboard = {};
            updateLeaderboard();
            break;
    }   
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.customId == 'register'){
        guild.roles.fetch('938577503323291719').then((role) => { interaction.member.roles.add(role) });
        genChannel.send(`<@${interaction.member.id}> has become a league member!`);
        interaction.deferUpdate();
        return;
    }
    
    if (interaction.member.id !== config.annaId) { return; }
    if (interaction.isButton()) { require('./core/buttonHandler')(interaction); }
    if (interaction.isSelectMenu()) { require('./core/menuHandler')(interaction); }
});

client.login(config.token);
setInterval(require('./core/monitorTime'), 60000); //1 Minute Interval