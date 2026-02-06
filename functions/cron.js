import { getDayGameIds, getTeamsData, getTodaysGames } from "./getData.js";
import { runEloAlgo } from "./init.js";

export default async function updateStats () {
    await getDayGameIds();
    await runEloAlgo('dayGames.json');
    await getTeamsData();
    await getTodaysGames();
}

await updateStats();