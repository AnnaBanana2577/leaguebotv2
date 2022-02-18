const getMatchDetails = require("../helpers/getMatchDetails");

module.exports = (message) => {
    const nextMatch = getMatchDetails(matches[nMatch]);

    if (!queue.includes(message.author.id)){
        message.channel.send('You have not joined a match yet.');
        return;
    }

    queue = queue.filter(function(ob){ return(ob !== message.author.id) });
    message.channel.send(`<@${message.author.id}> has left the ${nextMatch.name} match`);
}