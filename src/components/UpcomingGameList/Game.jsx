import './Game.css';

export default function Game ({homeTeam, awayTeam, homeLogo, awayLogo, timeUTC, homeElo, awayElo, homeWinProb, awayWinProb}) {

    const gameTime = getGameTime(timeUTC);

    return (
        <div className="game-list__game">
            <div className="game-list__team">
                <img src={homeLogo} alt="home team logo" />
                <p><b>{homeElo}</b></p>
                <p>({homeWinProb}%)</p>
            </div>
            <div className="game-list__vs">
                <p className="game-list__large-text">VS</p>
                <p>{gameTime}</p>
            </div>
            <div className="game-list__team">
                <img src={awayLogo} alt="away team logo" />
                <p><b>{awayElo}</b></p>
                <p>({awayWinProb}%)</p>
            </div>
        </div>
    );
}

function getGameTime (timeUTC) {

    const [hour, min] = timeUTC.split(':');

    const today = new Date();
    const utcDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), hour, min));

    const options = {hour: '2-digit', minute: '2-digit'};
    const gameTime = new Intl.DateTimeFormat('en-US', options).format(utcDate);

    return gameTime;
}