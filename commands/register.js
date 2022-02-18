const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = (message) => {
    const isMember = message.member.roles.cache.some(role => role.name === 'League Members');

    if (isMember) {
        message.channel.send('You are already a League Member');
        return;
    }

    message.channel.send('To register, read everything in <#936017207660531712>');

};