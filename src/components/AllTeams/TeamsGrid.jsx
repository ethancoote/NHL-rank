import TeamBox from './TeamBox';
import './TeamsGrid.css';

export default function TeamsGrid ({teamsData}) {
    const teamBoxArray = [];
    for (let i = 0; i < teamsData.length; i++) {
        teamBoxArray.push(<TeamBox teamAbbrev={teamsData[i].teamAbbrev} teamLogo={teamsData[i].teamLogo} key={crypto.randomUUID()}/>);
    }

    return (
        <div className="teams-grid">
            {teamBoxArray}
        </div>
    );
}