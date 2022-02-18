const getMatchDetails = require("../helpers/getMatchDetails");

module.exports = (message) => {
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

        if (queue.includes(message.author.id)){
            message.channel.send(`You have already joined the ${nextMatch.name} match.`);
            return
        }

        queue.push(message.author.id);
        message.channel.send(`<@${message.author.id}> has joined the ${nextMatch.name} match`);
}