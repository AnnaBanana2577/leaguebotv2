module.exports = (interaction) => {
    switch (interaction.customId){
        case 'winners':
            award.winners = interaction.values;
            break;
        case 'kills':
            award.kills = interaction.values;
            break;
        case 'caps':
            award.caps = interaction.values;
            break;
        case 'noshows':
            award.noshows = interaction.values;
            break;
    }
    interaction.deferUpdate();
};