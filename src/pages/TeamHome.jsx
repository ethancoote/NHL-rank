import TeamDashboard from '../components/TeamDashboard/TeamDashboard';

export default function TeamLayout ({teamData, eloRank, allTeamsData}) {
    return (
        <>
        <main className='section h-90'>
            <TeamDashboard teamData={teamData} eloRank={eloRank} allTeamsData={allTeamsData}/>
        </main>
        </>
    );
}