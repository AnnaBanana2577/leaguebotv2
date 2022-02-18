const { MessageEmbed } = require("discord.js");
const getMatchDetails = require("../helpers/getMatchDetails");
const getNamesFromIds = require("../helpers/getNamesFromIds");
const createReport = require("./createReport");
const awardPoints = require('../helpers/awardPoints');
const updateLeaderboard = require("../helpers/updateLeaderboard");

const serverNames = ['juicy fruit', 'lemon water', 'orange crush', 'dogs', 'cats', 'mouse', 'chicken', 'diamond', 'cattle', 'kitchen', 'dumpster', 'famine', 'wheat'];
const passwords = ['apple', 'pear', 'grape', 'kiwi', 'berry', 'keyboard', 'spine', 'catfish', 'vanilla', 'cream', 'cookie', 'pencil', 'flower', 'gate', 'door'];

module.exports = async (matchDetails, players) => {
    let reportName = matchDetails.name.replace(' EST', '').replace(':','-');
        //Quick and dirty epoch grabber
        let epoch = '';
        switch (matchDetails.time) {
            case 660: //11am
                epoch = '1645200000';
                break;
            case 900: //3pm
                epoch = '1645214400';
                break;
            case 1080: //6pm
                epoch = '1645225200';
                break;
            case 1140: //7pm
                epoch = '1645228800';
                break;
            case 1200: //8pm
                epoch = '1645232400';
                break;
        }

    //Get Player Count
    let playerCount = 0;
    players.forEach((playah) => {
      playerCount += 1;
    });

    //If No Players
    if(playerCount == 0) { 
        genChannel.send({ embeds: [new MessageEmbed().setTitle('A match was scheduled to start now, but since no players have joined this match will be skipped')] });
        return;
    }

    //If Only One Player
    if(playerCount == 1) { 
        genChannel.send(`The match was schedule to start now, but only <@${players[0]}> joined, and the match needs more than 1 player, therefore this match will be skipped.`);
        return;
    }

    //If Odd Number
    const isOdd = (playerCount % 2) == 1;
    if (isOdd) {
        const lastPlayer = players.pop();
        genChannel.send(`<@${lastPlayer}>, unfortunately due to an odd number of people joining, and you being the last one to join, you have been removed from this match.\nSorry! You will receive 1 point for the inconvenience`);
        awardPoints(lastPlayer, 1);
        const repname = matchDetails.name.replace('')
        pointsChannel.send({ embeds: [new MessageEmbed().setColor('808080').setTitle(`${reportName.replace('-', ':')}`).setDescription(`<@${lastPlayer}> has been awarded 1 point for being removed from the match due to odd number of players`)] });
        updateLeaderboard();
    }

    //Prep Match Name - Server Name - Password - Player List
    const serverName = serverNames[Math.floor(Math.random()*serverNames.length)];
    const serverPassword = passwords[Math.floor(Math.random()*passwords.length)];
    let playerNamesMention = [];
    players.forEach((player) => {
        playerNamesMention.push(`<@${player}>`);
    });
    const playerList = playerNamesMention.join(' - ');

    //Send Message To General
    genChannel.send({ content: playerList, embeds: [new MessageEmbed().setTitle(`The <t:${epoch}:t> match has started`).addField('Players', playerList).addField('Captain', `<@${players[0]}>`).addField('Server Name', serverName).addField('Password', 'Check DM')] });

    //Send DM To Each Player
    players.forEach((player, index) => {
        if (index == 0){ //captain
            client.users.fetch(player, false).then((user) => {
                const dmMessage = new MessageEmbed()
                .setTitle("YOUR ARE THE GAME CAPTAIN - THE MATCH HAS STARTED")
                .setDescription('Please create a server with the below information')
                .addField('Server Name', `${serverName}`)
                .addField('Password', `${serverPassword}`)
                .setColor('0000FF');
                user.send({embeds: [dmMessage]});
               });
        }
        else{ //not captain
            client.users.fetch(player, false).then((user) => {
                const dmMessage2 = new MessageEmbed()
                .setTitle("THE MATCH HAS STARTED")
                //.addField('Captain', `${db.currentMatch.queue[0]}`)
                .addField('Server Name', `${serverName}`)
                .addField('Password', `${serverPassword}`)
                .setColor('0000FF');
                user.send({embeds: [dmMessage2]});
           });
        }
    });

    //Create Report
    createReport(players, reportName);
};