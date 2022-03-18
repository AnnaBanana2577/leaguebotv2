const getMatchDetails = require("../helpers/getMatchDetails");
const getNamesFromIds = require("../helpers/getNamesFromIds");

module.exports = async (message) => {
    const nextMatch = getMatchDetails(matches[nMatch]);
    const playerNames = await getNamesFromIds(queue);
    const output = playerNames.join(' - ');

    if (!queue.includes(message.author.id)){
        message.channel.send(`You have not joined a match yet.\n**${queue.length} Players**: ${output}`);
        return;
    }

    queue = queue.filter(function(ob){ return(ob !== message.author.id) });
    message.channel.send(`<@${message.author.id}> has left the ${nextMatch.name} match\n**${queue.length} Players**: ${output}`);
}