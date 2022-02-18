module.exports = (msg) => {

    if (msg.member.roles.cache.some(role => role.name === config.notiRole)) { //They have the role
        msg.channel.send(`<@${msg.author.id}> has removed the League Notifications role and will no longer be pinged when league matches open up for joining`);
        msg.guild.roles.fetch(config.notiRoleId).then((role) => { msg.member.roles.remove(role) })
    }
    else {  //They don't have the role
        msg.channel.send(`<@${msg.author.id}> has received the League Notifications role and will be pinged when league matches open up for joining`);
        msg.guild.roles.fetch(config.notiRoleId).then((role) => { msg.member.roles.add(role) })
    }
};