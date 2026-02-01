import {writeFileSync} from 'fs';
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
            awayScore: gameData.awayTeam.score
        }
        return gameScore;
    } catch (err) {
        console.error(err);
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
//await getDayGameIds();
//await runEloAlgo('dayGames.json');



