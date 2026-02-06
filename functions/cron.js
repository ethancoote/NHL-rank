import { getDayGameIds, getTeamsData, getTodaysGames } from "./getData";
import { runEloAlgo } from "./init";

export default async function updateStats () {
    await getDayGameIds();
    await runEloAlgo('dayGames.json');
    await getTeamsData();
    await getTodaysGames();
}


await updateStats();