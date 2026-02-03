import {readFileSync, writeFileSync} from 'fs';
import { runEloAlgo } from './init.js';

export async function getDayGameIds () {
    try {
        const date = getYesterdayString();
        const response = await fetch (`https://api-web.nhle.com/v1/score/${date}`);
        if (!response.ok) {
            console.error(`getDayGameIds: ${response.status}`)
            return null
        }
        const dayGames = await response.json();
        let idArray = [];
        for (let i = 0; i < dayGames.games.length; i++) {
            const id = dayGames.games[i].id;
            idArray.push(id);
        }
        writeFileSync("../src/data/dayGames.json", JSON.stringify(idArray));

    } catch (err) {
        console.error(`getDayGameIds: ${err}`);
        return null;
    }
}

export async function getGameScore (id) {
    try {
        let response = await fetch(`https://api-web.nhle.com/v1/gamecenter/${id}/landing`)
        if (!response.ok) {
            console.error(response.status);
            return null;
        }
        let gameData = await response.json();
        const gameScore = {
            homeTeam: gameData.homeTeam.abbrev,
            homeScore: gameData.homeTeam.score,
            awayTeam: gameData.awayTeam.abbrev,
            awayScore: gameData.awayTeam.score,
            ot: gameData.otInUse
        }
        return gameScore;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getTeamsData () {
    try {
        const currentTeamsData = JSON.parse(readFileSync("../src/data/teamsData.json"));
        const response = await fetch(`https://api-web.nhle.com/v1/standings/now`);
        if (!response.ok) {
            console.error(`getMiscData cannot fetch: ${response.status}`);
            return null;
        }
        let teamsData = await response.json();
        teamsData = teamsData.standings;
        for (let i = 0; i < teamsData.length; i++) {
            const newTeamData = teamsData[i];
            const currentTeamIndex = currentTeamsData.findIndex(team => team.teamAbbrev === newTeamData.teamAbbrev.default);
            currentTeamsData[currentTeamIndex].gamesPlayed = newTeamData.gamesPlayed;
            currentTeamsData[currentTeamIndex].division = newTeamData.divisionAbbrev;
            currentTeamsData[currentTeamIndex].rank = i+1;
            currentTeamsData[currentTeamIndex].wins = newTeamData.wins;
            currentTeamsData[currentTeamIndex].losses = newTeamData.losses;
            currentTeamsData[currentTeamIndex].otLosses = newTeamData.otLosses;
        }
        writeFileSync("../src/data/teamsData.json", JSON.stringify(currentTeamsData));
    } catch (err) {
        console.error(`getMiscData: ${err}`);
        return null;
    }
}

function getYesterdayString () {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() -1);

    const dateString = yesterday.toISOString().slice(0, 10);
    return dateString;
}

// RUN THIS EVERY DAY
await getDayGameIds();
await runEloAlgo('dayGames.json');
//await getTeamsData ();



