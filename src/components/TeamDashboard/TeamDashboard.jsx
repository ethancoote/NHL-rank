import TeamStats from './TeamStats';
import TeamGraph from './TeamGraph';
import './TeamDashboard.css';

export default function TeamDashboard ({teamData, eloRank, allTeamsData}) {
    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="dashboard__logo-wrap">
                    <img className="dashboard__logo" src={teamData.teamLogo} alt={`${teamData.teamAbbrev} Logo`}/>
                    <h1>{teamData.teamName}</h1>
                </div>
                <div className="dashboard__elo-rank-wrap">
                    <p className="dashboard__elo-rank">#{eloRank}</p>
                    <p className="dashboard__text-md">Elo Rank</p>
                </div>
            </div>
            <div className="dashboard__content">
                <TeamStats teamData={teamData}/>
                <TeamGraph teamData={teamData} allTeamsData={allTeamsData}/>
            </div>
            
        </div>
    );
}