import TeamsGrid from '../components/AllTeams/TeamsGrid';
import './Teams.css';

export default function Teams ({teamsData}) {
    return (
        <main className="section h-90">
            <h1 className="teams__text-head">Team Stats</h1>
            <p className="teams__text-md">Find statistics and Elo rankings for every NHL team.</p>
            <TeamsGrid teamsData={teamsData}/>
        </main> 
    );
}