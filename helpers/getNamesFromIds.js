module.exports = async (ids) => {
    const guild = await client.guilds.fetch(config.guild);
    let names = [];
 
    for (id of ids){
    try {
        const member = await guild.members.fetch(id);
        names.push(member.user.username);
    }
    catch{
        names.push('NotInServer');
    }
    }
 
    return names;
 };