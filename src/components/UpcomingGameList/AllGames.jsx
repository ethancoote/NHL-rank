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