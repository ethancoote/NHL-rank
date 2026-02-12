import { readFileSync, writeFileSync } from 'fs';
import { getWinProb } from './elo.js';
import { sleep, getYesterdayString } from './helpers.js';
import path from 'path';

const dirname = import.meta.dirname;

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
        writeFileSync(path.join(dirname, "../src/data/dayGames.json"), JSON.stringify(idArray));

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
        let currentTeamsData = JSON.parse(readFileSync(path.join(dirname, "../src/data/teamsData.json")));
        const response = await fetch(`https://api-web.nhle.com/v1/standings/now`);
        if (!response.ok) {
            console.error(`getTeamsData cannot fetch: ${response.status}`);
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
            console.log(`${i} ----------------- ${newTeamData.teamAbbrev.default}`);
            currentTeamsData = await getNextGame(newTeamData.teamAbbrev.default, currentTeamsData);
        }
        writeFileSync(path.join( dirname, "../src/data/teamsData.json"), JSON.stringify(currentTeamsData));
    } catch (err) {
        console.error(`getTeamsData: ${err}`);
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
            writeFileSync(path.join(dirname, "../src/data/todaysGames.json"), JSON.stringify([]));
            return [];
        }

        const teamData = JSON.parse(readFileSync(path.join(dirname, "../src/data/teamsData.json")));
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

        writeFileSync(path.join(dirname, "../src/data/todaysGames.json"), JSON.stringify(allGames));

    } catch (err) {
        console.error(`getTodaysGames(): ${err}`);
    }
}

function getGameData (game, homeTeam, awayTeam) {
    const winProb = getWinProb(homeTeam.elo, awayTeam.elo);
    const gameObj = {
        homeTeam: game.homeTeam.abbrev,
        awayTeam: game.awayTeam.abbrev,
        timeUTC: game.startTimeUTC.slice(11, 16),
        homeLogo: game.homeTeam.logo,
        awayLogo: game.awayTeam.logo,
        homeWinProb: Math.round(winProb.homeWinProb * 10000) / 100,
        awayWinProb: Math.round(winProb.awayWinProb * 10000) / 100,
        homeElo: homeTeam.elo,
        awayElo: awayTeam.elo,
        gameDate: game.gameDate
    }

    return gameObj;
}

async function getNextGame (teamAbbrev, teamsData) {
    let game = null;
    let date = new Date();
    
    try {
        
        for (let j = 0; j < 8 && game === null; j++) {

            // set new date string
            let month = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            let day = date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
            let dateString = `${date.getFullYear()}-${month}-${day}`;

            // api this weeks games
            const response = await fetch(`https://api-web.nhle.com/v1/club-schedule/${teamAbbrev}/week/${dateString}`);
            if (!response.ok) {
                throw new Error(`fetch failed bro: ${response.status}`);
            }
            const data = await response.json();

            // to prevent rate limiting
            await sleep(1000);

            // FUT is a future game. Looking if a future game exists this week
            for (let i = 0; i < data.games.length; i++) {
                if (data.games[i].gameState === "FUT") {
                    const homeIndex = teamsData.findIndex(team => team.teamAbbrev === data.games[i].homeTeam.abbrev);
                    const awayIndex = teamsData.findIndex(team => team.teamAbbrev === data.games[i].awayTeam.abbrev);
                    game = getGameData(data.games[i], teamsData[homeIndex], teamsData[awayIndex]);
                    break;
                }
            }

            date.setDate(date.getDate()+7);
        }

        const teamIndex = teamsData.findIndex(team => team.teamAbbrev === teamAbbrev);
        teamsData[teamIndex].nextGame = game;
        return teamsData;

    } catch (err) {
        console.error(`ERROR: ${err}`);
        return null;
    }
} 