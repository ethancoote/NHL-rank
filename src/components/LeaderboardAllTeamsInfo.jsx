import LeaderboardTeamInfo from './LeaderboardTeamInfo.jsx';
//import {useState} from 'react';
import data from '../data/teamsData.json';
import './LeaderboardAllTeamsInfo.css';

export default function LeaderboardAllTeamsInfo () {
    const teamsData = data;

    const teamInfoComponents = teamsData.map((team) => {
        return (
            <LeaderboardTeamInfo 
                team={team.teamAbbrev} 
                logo={team.teamLogo}
                elo={team.elo}
                key={crypto.randomUUID()}
            />
        );
    });

    return (
        <table>
            <thead >
                <tr className="leaderboard__table-head">
                    <th className="leaderboard__table-logo">Team</th>
                    <th className="leaderboard__table-team"></th>
                    <th className="leaderboard__table-elo">Elo</th>
                </tr>
                
            </thead>
            <tbody>
                {teamInfoComponents}
            </tbody>
            
        </table>
        
    );
}