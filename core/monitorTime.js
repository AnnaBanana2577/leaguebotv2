const { MessageEmbed } = require("discord.js");
const getMatchDetails = require("../helpers/getMatchDetails");
const startMatch = require('./startMatch');

module.exports = () => {
    const nextMatch = getMatchDetails(matches[nMatch]);

    //Quick and dirty epoch grabber
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

    if (nextMatch.distance == 20){
        genChannel.send({ content: `<@&${config.notiRoleId}>`, embeds: [new MessageEmbed().setTitle(`The <t:${epoch}:t> match has opened up for joining`).addField('Join Match', '`!join`')] });
    }
    if(nextMatch.distance == 0){
        startMatch(nextMatch, [...queue]);

        //Reset queue and set new nextMatch
        queue = [];
        if (nMatch == (matches.length - 1)){
            nMatch = 0;
        }
        else {
            nMatch++;
        }
    }
};