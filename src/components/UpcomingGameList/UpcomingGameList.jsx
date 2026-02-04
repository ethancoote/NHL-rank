import AllGames from './AllGames.jsx';
import './UpcomingGameList.css';

export default function UpcomingGameList () {

    return (
        <div className="game-list">
            <h2>Upcoming Games</h2>
            <p>All the NHL games that are happening today.</p>
            <AllGames />
        </div>
    );
}