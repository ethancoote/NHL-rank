import StatsBox from './StatsBox';
import Game from '../UpcomingGameList/Game';
import './TeamStats.css';

export default function TeamStats ({teamData}) {

    const winPercent = Math.round((teamData.wins / teamData.gamesPlayed)*1000) /10;

    return (
        <div className="team-stats">
            <div>
                <p className="team-stats__elo">{teamData.elo}</p>
                <p className="team-stats__text-md center">Elo Rating</p>
            </div>
            <div className="team-stats__row">
                <StatsBox head="Win" body={teamData.wins}/>
                <StatsBox head="Loss" body={teamData.losses}/>
                <StatsBox head="OTL" body={teamData.otLosses}/>
            </div>
            <div className="team-stats__row">
                <StatsBox head="Games Played" body={teamData.gamesPlayed}/>
                <StatsBox head="Win Percent" body={`${winPercent}%`}/>
            </div>
            <p className="team-stats__text-md">Next Game</p>
        </div>
    );
}