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
            <p className="leaderboard__p-text">This is the <b>unofficial leaderboard</b> for the 2026-2027 NHL season. ELO rankings are updated at <b>10:00 AM UTC</b> every day.</p>
            <LeaderboardAllTeamsInfo/>
        </div>
    );
}

/*
<p className="shrink balance">This is the unofficial NHL Elo leaderboard for the 2025-2026 season.</p>
*/