import games from '../../data/todaysGames.json';
import Game from './Game.jsx';
import './AllGames.css';


export default function AllGames () {
    const allGamesComponent = games.map(game => {
        return (
            <Game 
                homeTeam={game.homeTeam} 
                awayTeam={game.awayTeam}
                timeUTC={game.timeUTC}
                homeLogo={game.homeLogo}
                awayLogo={game.awayLogo}
                homeElo={game.homeElo}
                awayElo={game.awayElo}
                homeWinProb={game.homeWinProb}
                awayWinProb={game.awayWinProb}
                key={crypto.randomUUID()}
            />
        );
    });
    return (
        <>
        {allGamesComponent}
        </>
        
    );
}