import { Link } from 'react-router';
import './TeamBox.css';


export default function TeamBox ({teamAbbrev, teamLogo}) {
    return (
        <Link to={`/teams/${teamAbbrev}`} className="team-box">
            <img src={teamLogo} alt={`${teamAbbrev} logo`}/>
        </Link>
    );
}