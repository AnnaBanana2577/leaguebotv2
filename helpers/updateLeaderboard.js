const getNamesFromIds = require("./getNamesFromIds");
const { AsciiTable3, AlignmentEnum } = require("ascii-table3");
const fs = require("fs");

module.exports = async () => {
  const channelLb = client.channels.cache.get(config.leaderboardChannel);
  const topPlayers = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  let ids = [];
  for (player of topPlayers) {
    ids.push(player[0]);
  }

  const names = await getNamesFromIds(ids);

  var table = new AsciiTable3("Leaderboard - Top 30").setHeading(
    "Rank",
    "Name",
    "Points"
  );

  let count = 1;
  let playerStats = [];
  for (pName in names) {
    if (count > 30) break;
    playerStats.push([
      count,
      AsciiTable3.truncateString(names[pName], 15),
      topPlayers[pName][1],
    ]);
    count++;
  }
  table.addRowMatrix(playerStats);

  const epoch = Math.floor(Date.now() / 1000);
  const lbMessage = await channelLb.messages.fetch(config.leaderboardMessage);
  lbMessage.edit(
    `Last Updated: <t:${epoch}:f>\n` + "```" + table.toString() + "```"
  );

  fs.writeFile("./database.json", JSON.stringify(leaderboard), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("wrote db");
    }
  });
};
