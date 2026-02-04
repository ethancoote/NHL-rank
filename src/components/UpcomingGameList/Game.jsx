import './Game.css';

export default function Game ({homeTeam, awayTeam, homeLogo, awayLogo, timeUTC}) {
    return (
        <div className="game-list__game">
            <p>{timeUTC} UTC</p>
            <p>{homeTeam} vs {awayTeam}</p>
        </div>
    );
}