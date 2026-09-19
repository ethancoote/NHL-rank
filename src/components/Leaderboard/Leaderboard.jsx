import './Leaderboard.css';
import LeaderboardAllTeamsInfo from './LeaderboardAllTeamsInfo.jsx';

export default function Leaderboard ({display}) {
    let displayClass = "leaderboard";
    if (display !== "leaderboard") {
        displayClass = "leaderboard hide";
    }
    return (
        <div className={displayClass}>
            <h1>Leaderboard</h1>
            <p>The NHL 2026-2027 preseason is underway. Some stats may be left from the previous season.</p>
            <p>All stats will reset when the regular season begins.</p>
            <LeaderboardAllTeamsInfo/>
        </div>
    );
}

/*
<p className="shrink balance">This is the unofficial NHL Elo leaderboard for the 2025-2026 season.</p>
*/