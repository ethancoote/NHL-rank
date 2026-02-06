import { readFileSync, writeFileSync } from 'fs';
import { getWinProb } from './elo.js';

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

export async function getTodaysGames() {
    try {
        const response = await fetch("https://api-web.nhle.com/v1/schedule/now");
        if (!response.ok) {
            console.error(`getTodaysGames() fetch error: ${response.status}`);
        }

        const schedule = await response.json();
        const todaysGames = schedule.gameWeek[0]?.games;
        if (!todaysGames) {
            writeFileSync("../src/data/todaysGames.json", JSON.stringify([]));
            return [];
        }

        const teamData = JSON.parse(readFileSync("../src/data/teamsData.json"));
        let allGames = [];
        
        for (let i = 0; i < todaysGames.length; i++) {
            const homeIndex = teamData.findIndex(team => team.teamAbbrev === todaysGames[i].homeTeam.abbrev);
            const awayIndex = teamData.findIndex(team => team.teamAbbrev === todaysGames[i].awayTeam.abbrev);

            const winProb = getWinProb(teamData[homeIndex].elo, teamData[awayIndex].elo);

            const game = {
                homeTeam: todaysGames[i].homeTeam.abbrev,
                awayTeam: todaysGames[i].awayTeam.abbrev,
                timeUTC: todaysGames[i].startTimeUTC.slice(11, 16),
                homeLogo: todaysGames[i].homeTeam.logo,
                awayLogo: todaysGames[i].awayTeam.logo,
                homeWinProb: Math.round(winProb.homeWinProb * 10000) / 100,
                awayWinProb: Math.round(winProb.awayWinProb * 10000) / 100,
                homeElo: teamData[homeIndex].elo,
                awayElo: teamData[awayIndex].elo
            }

            allGames.push(game);
        }

        writeFileSync("../src/data/todaysGames.json", JSON.stringify(allGames));

    } catch (err) {
        console.error(`getTodaysGames(): ${err}`);
    }
}

function getYesterdayString () {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() -1);

    const dateString = yesterday.toISOString().slice(0, 10);
    return dateString;
}

export function githubTest () {
    console.log("SUCCESS!");
}