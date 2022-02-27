const awardPoints = require("../helpers/awardPoints");
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, ButtonInteraction } = require("discord.js");
const updateLeaderboard = require("../helpers/updateLeaderboard");

module.exports = async (interaction) => {

    const optionsArray = interaction.message.components[0].components[0].options;
    const rep = client.channels.cache.get(interaction.channelId);
    const roundName = interaction.message.embeds[0].title;

    const winners = award.winners;
    const kills = award.kills[0]
    const caps = award.caps[0]
    const noshows= award.noshows;

    winners.forEach((winner) => {
        awardPoints(winner, 2);
        pointsChannel.send({ embeds: [new MessageEmbed().setColor('00FF00').setTitle(`${rep.name.replace('-', ':')} | ${roundName}`).setDescription(`<@${winner}> has been awarded 2 points for winning`)] });
    });

    if (kills !== undefined) {
        awardPoints(kills, 2);
        pointsChannel.send({ embeds: [new MessageEmbed().setColor('FFA500').setTitle(`${rep.name.replace('-', ':')} | ${roundName}`).setDescription(`<@${kills}> has been awarded 2 points for most kills on winning team`)] });
    }

    if (caps !== undefined) {
        awardPoints(caps, 2);
        pointsChannel.send({ embeds: [new MessageEmbed().setColor('FFA500').setTitle(`${rep.name.replace('-', ':')} | ${roundName}`).setDescription(`<@${caps}> has been awarded 2 points for most flag captures on winning team`)] });
    }

    noshows.forEach((noshow) => {
        awardPoints(noshow, -2);
        pointsChannel.send({ embeds: [new MessageEmbed().setColor('FF0000').setTitle(`${rep.name.replace('-', ':')} | ${roundName}`).setDescription(`<@${noshow}> has been penalized 1 point for not showing up to the round`)] });
    })

    const rowWinners = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('winners')
            .setPlaceholder('Who was on the winning team?')
            .setMaxValues(optionsArray.length)
            .addOptions(optionsArray)
    );

    const rowKills = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('kills')
            .setPlaceholder('Who had the most kills on winning team?')
            .setMaxValues(1)
            .addOptions(optionsArray)
    );

    const rowCaps = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('caps')
            .setPlaceholder('Who had the most flag captures on winning team?')
            .setMaxValues(1)
            .addOptions(optionsArray)
    );

    const rowNoshows = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('noshows')
            .setPlaceholder('Who didnt show up for this round?')
            .setMaxValues(optionsArray.length)
            .addOptions(optionsArray)
    );

    switch (interaction.message.embeds[0].title) {
        case 'Round 1':
            const roundMessage2 = new MessageEmbed()
            .setTitle('Round 2')
            .setColor('FF0000');
            const rowButton2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('closeReport')
                    .setLabel('Done Scoring Round 2')
                    .setStyle('PRIMARY')
            );
            updateLeaderboard();
            interaction.update({ embeds: [roundMessage2],components: [rowWinners, rowKills, rowCaps, rowNoshows, rowButton2] });
            break;
        case 'Round 2':
            const rowButton3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('closeReport')
                    .setLabel('Done Scoring Round 3')
                    .setStyle('PRIMARY')
            );
            const roundMessage3 = new MessageEmbed()
            .setTitle('Round 3')
            .setColor('FF0000');
            updateLeaderboard();
            interaction.update({ embeds: [roundMessage3],components: [rowWinners, rowKills, rowCaps, rowNoshows, rowButton3] });
            break;
        case 'Round 3':
            //Give everyone 1 points
            optionsArray.forEach((option) => {
                awardPoints(option.value, 3);
                pointsChannel.send({ embeds: [new MessageEmbed().setColor('808080').setTitle(`${rep.name.replace('-', ':')}`).setDescription(`<@${option.value}> has been awarded 3 points for playing a match`)] });
            });
            genChannel.send({ embeds: [new MessageEmbed().setTitle(`The ${rep.name.replace('-', ':')} match has been scored and closed`)] });
            //Clean up report
            updateLeaderboard();
            await interaction.message.delete();
            rep.delete();
            break;
    }

    award = { "winners": [], "caps": "", "kills": "", "noshows": [] };
};