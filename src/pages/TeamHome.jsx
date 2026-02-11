import TeamDashboard from '../components/TeamDashboard/TeamDashboard';

export default function TeamLayout ({teamData, eloRank}) {
    return (
        <>
        <main className='section h-screen'>
            <TeamDashboard teamData={teamData} eloRank={eloRank}/>
        </main>
        </>
    );
}