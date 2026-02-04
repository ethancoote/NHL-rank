import './Leaderboard.css';
import LeaderboardAllTeamsInfo from './LeaderboardAllTeamsInfo.jsx';

export default function Leaderboard () {

    return (
        <div className="leaderboard">
            <h3>Leaderboard</h3>
            <p className="shrink balance">This is the unofficial NHL Elo leaderboard for the 2025-2026 season.</p>
            <LeaderboardAllTeamsInfo/>
        </div>
    );
}