import './Game.css';

export default function Game ({homeTeam, awayTeam, homeLogo, awayLogo, timeUTC, homeElo, awayElo, homeWinProb, awayWinProb}) {
    return (
        <div className="game-list__game">
            <div className="game-list__team">
                <img src={homeLogo} alt="home team logo" />
                <p><b>{homeElo}</b></p>
                <p>({homeWinProb}%)</p>
            </div>
            <div className="game-list__vs">
                <p className="game-list__large-text">VS</p>
                <p>{timeUTC} UTC</p>
            </div>
            <div className="game-list__team">
                <img src={awayLogo} alt="away team logo" />
                <p><b>{awayElo}</b></p>
                <p>({awayWinProb}%)</p>
            </div>
        </div>
    );
}