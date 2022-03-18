const getTime = require('./getTime');

module.exports = (matchTime) => {

    const nowTime = getTime();
    let dist = matchTime - nowTime;
    //if (dist < 0) { dist = (1440 - nowTime) + matchTime; }
    if (dist < 0) { dist = dist + 1440; }

    let hours = Math.floor(matchTime / 60);          
    let minutes = matchTime % 60;
    let ampm = '';
    if (hours > 12) { hours = hours - 12; ampm = 'pm'; } else { ampm = 'am'; }
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);

    const epoch = config.epoch[nMatch];
    //const matchName = `${hours}:${minutes}${ampm} EST`;
    const matchName = `<t:${config.epoch[nMatch]}:t>`;

    hours = Math.floor(dist / 60);          
    minutes = dist % 60;
    ampm = '';
    let noHours = false;
    if (hours == 0) { noHours = true }

    let howLongTillStart = `${hours} hours and ${minutes} minutes`;

    if (noHours){
        howLongTillStart = `${minutes} minutes`;
    }

    return {
        time: matchTime,
        name: matchName,
        howLong: howLongTillStart,
        distance: dist
    }
}