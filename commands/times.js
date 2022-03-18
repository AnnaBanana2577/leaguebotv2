const { MessageEmbed } = require("discord.js");

module.exports = async (message) => {
    const msg = new MessageEmbed().setColor('BLUE').setTitle('Match Times')
    config.epoch.forEach((epoch, i) => {
        msg.addField(`Match ${i + 1}`, `<t:${epoch}:t>`); 
    });
    const matchesChannel = client.channels.cache.get(config.matchesChannel);
    matchesChannel.send({ embeds: [msg] });
};