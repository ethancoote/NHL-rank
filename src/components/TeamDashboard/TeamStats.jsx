import StatsBox from './StatsBox';
import Game from '../UpcomingGameList/Game';
import './TeamStats.css';

export default function TeamStats ({teamData}) {

    const winPercent = Math.round((teamData.wins / teamData.gamesPlayed)*1000) /10;
    const nextGame = teamData.nextGame;

    return (
        <div className="team-stats">
            <div className='team-stats__row align-end g-12'>
                <p className="team-stats__elo">{teamData.elo}</p>
                <p className="team-stats__text-md center">Elo Rating</p>
            </div>
            <div className="team-stats__col">
                <div className="team-stats__row">
                    <StatsBox head="Win" body={teamData.wins} bg="green"/>
                    <StatsBox head="Loss" body={teamData.losses} bg="red"/>
                    <StatsBox head="OTL" body={teamData.otLosses} bg="yellow"/>
                </div>
                <div className="team-stats__row">
                    <StatsBox head="Games Played" body={teamData.gamesPlayed} bg="tint"/>
                    <StatsBox head="Win Percent" body={`${winPercent}%`} bg="tint"/>
                </div>
            </div>
            
            <div className="team-stats__col g-8">
                <div className='team-stats__row apart p-x-4'>
                    <p className="team-stats__text-md bold">Next Game</p>
                    <p className="team-stats__text-sm">{nextGame.gameDate}</p>
                </div>
                <Game 
                    homeLogo={nextGame.homeLogo}
                    awayLogo={nextGame.awayLogo}
                    timeUTC={nextGame.timeUTC}
                    homeElo={nextGame.homeElo}
                    awayElo={nextGame.awayElo}
                    homeWinProb={nextGame.homeWinProb}
                    awayWinProb={nextGame.awayWinProb}
                    bgWhite={false}
                    border={false}
                />
            </div>
            
        </div>
    );
}