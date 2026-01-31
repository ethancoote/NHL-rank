import { writeFileSync, readFileSync } from 'fs';
import { runEloAlgo } from './init.js';

function getDayGameIds (date) {

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

await runEloAlgo("gameIds-2025-2026.json");


