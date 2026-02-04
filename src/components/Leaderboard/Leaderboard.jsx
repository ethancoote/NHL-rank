import './Leaderboard.css';
import LeaderboardAllTeamsInfo from './LeaderboardAllTeamsInfo.jsx';

export default function Leaderboard () {

    return (
        <div className="leaderboard">
            <h3>Leaderboard</h3>
            <p className="shrink balance">This is the NHL Elo leaderboards for the 2025-2026 season. Compared to NHL league points, the Elo system is a more accurate method of measuring team strength.</p>
            <LeaderboardAllTeamsInfo/>
        </div>
    );
}