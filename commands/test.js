const { MessageEmbed } = require("discord.js");
const getMatchDetails = require("../helpers/getMatchDetails");


module.exports = (message) => {
    const nextMatch = getMatchDetails(matches[nMatch]);
    let epoch = '';
    switch (nextMatch.time) {
        case 660: //11am
            epoch = '1645200000';
            break;
        case 900: //3pm
            epoch = '1645214400';
            break;
        case 1080: //6pm
            epoch = '1645225200';
            break;
        case 1140: //7pm
            epoch = '1645228800';
            break;
        case 1200: //8pm
            epoch = '1645232400';
            break;
    }
    console.log(epoch)

    const nextMessage = new MessageEmbed()
        .setTitle(`The next match is at: <t:${epoch}:t>`)
        .setDescription('Use `!notify` to be pinged when matches open for joining')
        .setColor('0000FF')
        .addField('Match Starts', `<t:${epoch}:t>`);

    message.channel.send( { embeds: [nextMessage] } );
}