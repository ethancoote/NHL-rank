import { writeFileSync, readFileSync } from 'fs';
import updateElo from './elo.js';
import {getGameScore } from './getData.js';
import { sleep } from './helpers.js';
import path from 'path';

const dirname = import.meta.dirname;

export async function initData () {
    try {
        const response = await fetch("https://api-web.nhle.com/v1/standings/now");
        if (!response.ok) {
            throw new Error(`initData - Bad Response: ${response.status}`);
        }
        const data = await response.json();
        writeFileSync(path.join(dirname, "../src/data/standings.json"), JSON.stringify(data), 'utf8');

    } catch (err) {
        console.error(`initData - Counldn't fetch: ${err}`);
    }
}

export function initTeamsDataJSON (filepath) {
    const data = JSON.parse(readFileSync(path.join(dirname, `../src/data/${filepath}`)));
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

    writeFileSync(path.join(dirname, "../src/data/teamsData.json"), JSON.stringify(teamsData));
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
        await sleep(500);
    }

    writeFileSync(path.join(dirname, "../src/data/teamsData.json"), JSON.stringify(teamsData));
}