export default function updateElo (gameScore, teamsData) {
    if (!teamsData) {
        console.error("updateElo: teamsData not found.");
        return null;
    }
    const homeTeam = gameScore.homeTeam;
    const awayTeam = gameScore.awayTeam;
    const homeScore = gameScore.homeScore;
    const awayScore = gameScore.awayScore;
    const ot = gameScore.ot;

    let homeTeamIndex, awayTeamIndex, homeTeamElo, awayTeamElo = 0;

    try {
        homeTeamIndex = teamsData.findIndex(team => team.teamAbbrev === homeTeam);
        awayTeamIndex = teamsData.findIndex(team => team.teamAbbrev === awayTeam);
        homeTeamElo = teamsData[homeTeamIndex].elo;
        awayTeamElo = teamsData[awayTeamIndex].elo;
    } catch (err) {
        console.log(`home: ${homeTeam} away: ${awayTeam} | Non-NHL teams.`);
        return teamsData;
    }
    

    let newElo = {
        winnerElo: 0,
        loserElo: 0,
        winnerWinProb: .5,
        loserWinProb: .5
    };

    if (homeScore > awayScore) {
        newElo = eloFormula(homeTeamElo, awayTeamElo, ot);
        teamsData[homeTeamIndex].oldElo = teamsData[homeTeamIndex].elo;
        teamsData[awayTeamIndex].oldElo = teamsData[awayTeamIndex].elo;
        teamsData[homeTeamIndex].elo = newElo.winnerElo;
        teamsData[awayTeamIndex].elo = newElo.loserElo;

    } else if (homeScore < awayScore) {
        newElo = eloFormula(awayTeamElo,homeTeamElo, ot);
        teamsData[homeTeamIndex].oldElo = teamsData[homeTeamIndex].elo;
        teamsData[awayTeamIndex].oldElo = teamsData[awayTeamIndex].elo;
        teamsData[awayTeamIndex].elo = newElo.winnerElo;
        teamsData[homeTeamIndex].elo = newElo.loserElo;
    } else {
        console.log(`${homeTeam} vs ${awayTeam}. A Tie... How?`)
        return null;
    }

    // add game to array of past games for each team
    if (!teamsData[homeTeamIndex].pastGames) {
        teamsData[homeTeamIndex].pastGames = [];
    }
    teamsData[homeTeamIndex].pastGames.push({
        opponent: awayTeam,
        elo: teamsData[homeTeamIndex].elo,
        eloChange: (teamsData[homeTeamIndex].elo - teamsData[homeTeamIndex].oldElo)
    });

    if (!teamsData[awayTeamIndex].pastGames) {
        teamsData[awayTeamIndex].pastGames = [];
    }
    teamsData[awayTeamIndex].pastGames.push({
        opponent: homeTeam,
        elo: teamsData[awayTeamIndex].elo,
        eloChange: (teamsData[awayTeamIndex].elo - teamsData[awayTeamIndex].oldElo)
    });

    console.log(`${teamsData[homeTeamIndex].teamAbbrev}: ${teamsData[homeTeamIndex].elo} vs ${teamsData[awayTeamIndex].teamAbbrev}: ${teamsData[awayTeamIndex].elo}`);

    return teamsData

};

export function getWinProb (homeElo, awayElo) {
    const homeExpected = 1 / (1 + 10**((awayElo - homeElo)/400));
    const awayExpected = 1 / (1 + 10**((homeElo - awayElo)/400));

    return {homeWinProb: homeExpected, awayWinProb: awayExpected}
}

function eloFormula (winnerElo, loserElo, ot) {

    // magic number elo formula
    const winnerExpected = 1 / (1 + 10**((loserElo - winnerElo)/400));
    const loserExpected = 1 / (1 + 10**((winnerElo - loserElo)/400));

    // to keep the game 0 sum, you earn 80% of points for an OT win, and 20% for an OT loss.
    let winnerPoints = 1;
    let loserPoints = 0;
    if (ot) {
        winnerPoints = 0.80;
        loserPoints = 0.20;
    }
    const k = 32;
    const winnerNewElo = Math.round(winnerElo + k * (winnerPoints - winnerExpected));
    const loserNewElo = Math.round(loserElo + k * (loserPoints - loserExpected));

    const newElo = {
        winnerElo: winnerNewElo,
        loserElo: loserNewElo,
        winnerWinProb: winnerExpected,
        loserWinProb: loserExpected,
    }

    return newElo;
}