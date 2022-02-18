const getMatchDetails = require("../helpers/getMatchDetails");
const getNamesFromIds = require("../helpers/getNamesFromIds");

module.exports = async (message) => {

    const nextMatch = getMatchDetails(matches[nMatch]);

    if (nextMatch.distance > 20){
        message.channel.send(`There are no matches open currently.\n\nTo see when the next match is, use \`!next\`\nTo see a list of all match times, checkout <#${config.matchesChannel}>\nTo get notified when matches open up, use \`!notify\``);
    }

    const playerNames = await getNamesFromIds(queue);
    const output = playerNames.join(' - ');
    message.channel.send(`The following players have joined the ${nextMatch.name} match: \n${output}`);

}