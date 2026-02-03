import LeaderboardTeamInfo from './LeaderboardTeamInfo.jsx';
//import {useState} from 'react';
import data from '../data/teamsData.json';
import './LeaderboardAllTeamsInfo.css';

export default function LeaderboardAllTeamsInfo () {
    const teamsData = eloSort(data);
    let rankIndex = 0;
    const teamInfoComponents = teamsData.map((team) => {
        rankIndex += 1;
        return (
            <LeaderboardTeamInfo 
                rank={rankIndex}
                team={team.teamAbbrev} 
                logo={team.teamLogo}
                elo={team.elo}
                gamesPlayed={team.gamesPlayed}
                division={team.division}
                wins={team.wins}
                losses={team.losses}
                otLosses={team.otLosses}
                key={crypto.randomUUID()}
            />
        );
    });

    return (
        <table>
            <thead className="leaderboard__sticky-head">
                <tr className="leaderboard__table-head">
                    <th className="leaderboard__table-logo">Team</th>
                    <th className="leaderboard__table-box leaderboard__gp">GP</th>
                    <th className="leaderboard__table-box">W</th>
                    <th className="leaderboard__table-box">L</th>
                    <th className="leaderboard__table-box">OTL</th>
                    <th className="leaderboard__table-box leaderboard__division">Division</th>
                    <th className="leaderboard__table-box">Elo</th>
                </tr>
                
            </thead>
            <tbody>
                {teamInfoComponents}
            </tbody>
            
        </table>
        
    );
}

function eloSort (data) {
    data = data.sort((a, b) => b.elo - a.elo);
    return data;
}