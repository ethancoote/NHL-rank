import { Link } from 'react-router';
import './LeaderboardTeamInfo.css';

export default function LeaderboardTeamInfo (props) {
    const {rank, logo, team, elo, gamesPlayed, division, wins, losses, otLosses, oldElo} = props;
    const diff = elo - oldElo;
    let diffString = "+0";
    let colorClass = "green";
    if (diff >= 0) {
        diffString = `+${diff}`;
        colorClass = "green";
    } else {
        diffString = `${diff}`;
        colorClass = "red";
    }

    const teamPagePath = `/teams/${team}`;
    return (
        <Link to={teamPagePath} className='leaderboard__link'>
            <div className="leaderboard__team-line">
            
                <div className="leaderboard__table-logo">
                    <p>{rank}</p>
                    <img 
                        src={logo} 
                        alt="team logo" 
                        className="leaderboard__logo" 
                    />
                    <p className="leaderboard__team">{team}</p>
                </div>
                <div className="leaderboard__table-box leaderboard__gp"><p>{gamesPlayed}</p></div>
                <div className="leaderboard__table-box"><p>{wins}</p></div>
                <div className="leaderboard__table-box"><p>{losses}</p></div>
                <div className="leaderboard__table-box"><p>{otLosses}</p></div>
                <div className="leaderboard__table-box leaderboard__division"><p>{division}</p></div>
                <div className="leaderboard__table-box leaderboard__elo"><p>{elo}</p></div>
                <div className={"leaderboard__table-box leaderboard__diff " + colorClass}><p>{diffString}</p></div>
            </div>
        </Link>
        
    );
}