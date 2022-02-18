const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require("discord.js")
const getNamesFromIds = require('../helpers/getNamesFromIds');

module.exports = async (players, reportName) => {
    //Create Report Channel
    const repchannel = await guild.channels.create(reportName, {
        parent: config.reportsCategory,
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
        {
            id: guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
            allow: ['VIEW_CHANNEL'], //Allow permissions
            deny: ['SEND_MESSAGES', 'ADD_REACTIONS'] //Deny permissions
        },
        {
            id: players[0], //To make it be seen by a certain role, user an ID instead
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
            deny: ['ADD_REACTIONS']
        }
        ],
    });

    //Send Message To Captain In Reports Channel
    repchannel.send(`<@${players[0]}> POST THE SCREENSHOT OF THE SCORE HERE\n-------------------------------------------------------`);

    //Create Array Of Options From Players
    const names = await getNamesFromIds(players);
    let optionsArray = [];
    for (pName in names){
        optionsArray.push({
            label: names[pName],
            value: players[pName]
        });
    }

    //Who Won?
    const rowWinners = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId('winners')
        .setPlaceholder('Who was on the winning team?')
        .setMaxValues(optionsArray.length)
        .addOptions(optionsArray)
    );

    const rowKills = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId('kills')
        .setPlaceholder('Who had the most kills on winning team?')
        .setMaxValues(1)
        .addOptions(optionsArray)
    );

    const rowCaps = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId('caps')
        .setPlaceholder('Who had the most flag captures on winning team?')
        .setMaxValues(1)
        .addOptions(optionsArray)
    );

    const rowNoshows = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId('noshows')
        .setPlaceholder('Who didnt show up for this round?')
        .setMaxValues(optionsArray.length)
        .addOptions(optionsArray)
    );

    const rowButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('closeReport')
                .setLabel('Done Scoring Round 1')
                .setStyle('PRIMARY')
        );

    const roundMessage = new MessageEmbed()
        .setTitle('Round 1')
        .setColor('FF0000');

        
    //Send Report Card
    repchannel.send({ embeds: [roundMessage],components: [rowWinners, rowKills, rowCaps, rowNoshows, rowButton] });


};