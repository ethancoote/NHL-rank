export default function updateElo (gameScore, teamsData) {
    if (!teamsData) {
        console.error("updateElo: teamsData not found.");
        return null;
    }
    const homeTeam = gameScore.homeTeam;
    const awayTeam = gameScore.awayTeam;
    const homeScore = gameScore.homeScore;
    const awayScore = gameScore.awayScore;

    const homeTeamIndex = teamsData.findIndex(team => team.teamAbbrev === homeTeam);
    const awayTeamIndex = teamsData.findIndex(team => team.teamAbbrev === awayTeam);
    const homeTeamElo = teamsData[homeTeamIndex].elo;
    const awayTeamElo = teamsData[awayTeamIndex].elo;

    let newElo = {
        winnerElo: 0,
        loserElo: 0,
        winnerWinProb: .5,
        loserWinProb: .5
    };

    if (homeScore > awayScore) {
        newElo = eloFormula(homeTeamElo, awayTeamElo);
        teamsData[homeTeamIndex].elo = newElo.winnerElo;
        teamsData[awayTeamIndex].elo = newElo.loserElo;

    } else if (homeScore < awayScore) {
        newElo = eloFormula(awayTeamElo,homeTeamElo);
        teamsData[awayTeamIndex].elo = newElo.winnerElo;
        teamsData[homeTeamIndex].elo = newElo.loserElo;
    } else {
        console.log(`${homeTeam} vs ${awayTeam}. A Tie... How?`)
        return null;
    }

    return teamsData

};

function eloFormula (winnerElo, loserElo) {

    //magic number elo formula
    const winnerExpected = 1 / (1 + 10**((loserElo - winnerElo)/400));
    const loserExpected = 1 / (1 + 10**((winnerElo - loserElo)/400));

    const k = 64;
    const winnerNewElo = Math.round(winnerElo + k * (1 - winnerExpected));
    const loserNewElo = Math.round(loserElo + k * (0 - loserExpected));

    const newElo = {
        winnerElo: winnerNewElo,
        loserElo: loserNewElo,
        winnerWinProb: winnerExpected,
        loserWinProb: loserExpected,
    }

    return newElo;
}