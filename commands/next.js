const { MessageEmbed } = require("discord.js");
const getMatchDetails = require("../helpers/getMatchDetails");


module.exports = (message) => {
    const nextMatch = getMatchDetails(matches[nMatch]);
    let epoch = config.epoch[nMatch];


    const nextMessage = new MessageEmbed()
        .setTitle(`The next match is in: ${nextMatch.howLong}`)
        .setDescription('Use `!notify` to be pinged when matches open for joining')
        .setColor('0000FF')
        .addField('Match Starts', `<t:${epoch}:t>`);

    message.channel.send( { embeds: [nextMessage] } );
}