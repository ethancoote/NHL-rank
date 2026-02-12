import './Game.css';

export default function Game ({homeLogo, awayLogo, timeUTC, homeElo, awayElo, homeWinProb, awayWinProb, bgWhite, border}) {
    
    const gameTime = getGameTime(timeUTC);

    let bgClass = "";
    if (bgWhite) {
        bgClass = "bg-white"
    }

    let borderClass = "";
    if (border) {
        borderClass = "border-solid";
    }

    return (
        <div className={`game-list__game ${bgClass} ${borderClass}`}>
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