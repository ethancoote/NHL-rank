import './LeaderboardTeamInfo.css';

export default function LeaderboardTeamInfo ({rank, logo, team, elo, gamesPlayed, division, wins, losses, otLosses}) {
    return (
        <tr className="leaderboard__team-line">
            
            <td className="leaderboard__table-logo">
                <p>{rank}</p>
                <img 
                    src={logo} 
                    alt="team logo" 
                    className="leaderboard__logo" 
                />
                <p className="leaderboard__team">{team}</p>
            </td>
            <td className="leaderboard__table-box leaderboard__gp"><p>{gamesPlayed}</p></td>
            <td className="leaderboard__table-box"><p>{wins}</p></td>
            <td className="leaderboard__table-box"><p>{losses}</p></td>
            <td className="leaderboard__table-box"><p>{otLosses}</p></td>
            <td className="leaderboard__table-box leaderboard__division"><p>{division}</p></td>
            <td className="leaderboard__table-box"><p>{elo}</p></td>
        </tr>
    );
}