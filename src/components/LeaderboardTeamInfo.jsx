import './LeaderboardTeamInfo.css';

export default function LeaderboardTeamInfo ({logo, team, elo}) {
    return (
        <tr className="leaderboard__team-line">
            <td className="leaderboard__table-logo">
                <img 
                    src={logo} 
                    alt="team logo" 
                    className="leaderboard__logo" 
                />
            </td>
            <td className="leaderboard__table-team"><p>{team}</p></td>
            <td className="leaderboard__table-elo"><p>{elo}</p></td>
        </tr>
    );
}