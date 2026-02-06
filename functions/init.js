import { writeFileSync, readFileSync } from 'fs';
import updateElo from './elo.js';
import {getGameScore} from './getData.js';
import path from 'path';

const dirname = import.meta.dirname;

export function initData () {
    fetch("https://api-web.nhle.com/v1/standings/now")
        .then(response => response.json())
        .then((response) => {
            const data = JSON.stringify(response);
            writeFileSync(path.join(dirname, "../src/data/standings.json"), data, 'utf8');

        });
}

export function initTeamsDataJSON (filepath) {
    const data = JSON.parse(readFileSync(path.join(dirname, filepath)));
    let teamsData = [];
    const standings = data.standings
    for (let i = 0; i< standings.length; i++) {
        const team = standings[i];
        const teamData = {
            teamName: team.teamName.default,
            teamAbbrev: team.teamAbbrev.default,
            teamLogo: team.teamLogo,
            elo: 1000
        }
        teamsData.push(teamData);
    }

    writeFileSync(path.join(dirname, "../src/data/teamData.json"), JSON.stringify(teamsData));
}

//date format 'YYYY-MM-DD'
export function getWeekGames (date) {
    let gamesArray = [];

    fetch(`https://api-web.nhle.com/v1/schedule/${date}`)
        .then(response => response.json())
        .then((response) => {
            const schedule = response.gameWeek;
            for (let i = 0; i < schedule.length; i++) {
                gamesArray.push(schedule[i].games);
                
            }
            gamesArray = gamesArray.flat();
            writeFileSync(path.join(dirname, `../src/data/gameIds${date}.json`), `${gamesArray},`, {flag: 'a'});
            
        });
}

export async function runEloAlgo (filename) {
    const gameIdArray = JSON.parse(readFileSync(path.join(dirname, `../src/data/${filename}`)));
    let teamsData = JSON.parse(readFileSync(path.join(dirname, "../src/data/teamsData.json")));
    for ( let i = 0; i < gameIdArray.length; i++ ) {
        const gameScore = await getGameScore(gameIdArray[i]);
        if (!gameScore) {
            console.log("Score Not found. The ID may be incorrent, or the game may not be completed.");
            break;
        }
        const teamsDataTemp = updateElo(gameScore, teamsData);
        if (!teamsDataTemp) {
            console.log("Teams Data Not found.");
            break;
        }
        teamsData = teamsDataTemp;
        console.log(`Game: ${i+1}/${gameIdArray.length}`);
    }

    writeFileSync(path.join(dirname, "../src/data/teamsData.json"), JSON.stringify(teamsData));
}