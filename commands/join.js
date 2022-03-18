const getMatchDetails = require("../helpers/getMatchDetails");
const getNamesFromIds = require("../helpers/getNamesFromIds");

module.exports = async (message) => {
        const nextMatch = getMatchDetails(matches[nMatch]);
        const isMember = message.member.roles.cache.some(role => role.name === 'League Members');

        if (!isMember){
            message.channel.send('Only League Members can join league matches. To become a member, use `!register`');
            return;
        }

        if(nextMatch.distance > 20) {
            message.channel.send(`There are no matches open for joining currently.\n\nTo see when the next match is, use \`!next\`\nTo see a list of all match times, checkout <#${config.matchesChannel}>\nTo get notified when matches open up, use \`!notify\``);
            return;
        }

        let playerNames = await getNamesFromIds(queue);
        let output = playerNames.join(' - ');
        //message.channel.send(`The following **${queue.length}** players have joined the ${nextMatch.name} match: \n${output}`);

        if (queue.includes(message.author.id)){
            message.channel.send(`You have already joined the ${nextMatch.name} match.\n**${queue.length} Players**: ${output}`);
            return
        }
        
        queue.push(message.author.id);
        playerNames = await getNamesFromIds(queue);
        output = playerNames.join(' - ');

        console.log(queue.length);
        message.channel.send(`<@${message.author.id}> has joined the ${nextMatch.name} match\n**${queue.length} Players**: ${output}`);
}