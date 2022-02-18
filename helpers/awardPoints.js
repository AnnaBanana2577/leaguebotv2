module.exports = (player, points) => {
    if (leaderboard.hasOwnProperty(player)){
        const origScore = Number(leaderboard[player]);
        const newScore = origScore + points;
        leaderboard[player] = newScore;
    }
    else {
        leaderboard[player] = points;
    }
}