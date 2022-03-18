const { MessageEmbed } = require("discord.js");
const getMatchDetails = require("../helpers/getMatchDetails");
const startMatch = require('./startMatch');

module.exports = () => {
    const nextMatch = getMatchDetails(matches[nMatch]);

    //Quick and dirty epoch grabber
    let epoch = config.epoch[nMatch];

    if (nextMatch.distance == 20){
        genChannel.send({ content: `<@&${config.notiRoleId}>`, embeds: [new MessageEmbed().setTitle(`The <t:${epoch}:t> match has opened up for joining`).addField('Join Match', '`!join`')] });
    }
    if(nextMatch.distance == 0){
        startMatch(nextMatch, [...queue], Number(nMatch + 1));

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