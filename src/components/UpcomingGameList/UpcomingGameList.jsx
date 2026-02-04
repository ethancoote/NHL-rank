import AllGames from './AllGames.jsx';
import './UpcomingGameList.css';

export default function UpcomingGameList ({display}) {
    let displayClass = "game-list";
    if (display !== "upcoming") {
        displayClass = "game-list hide";
    }
    return (
        <div className={displayClass}>
            <h2>Upcoming Games</h2>
            <p>All the NHL games that are happening today.</p>
            <AllGames />
        </div>
    );
}