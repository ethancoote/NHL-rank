import LeaderboardTeamInfo from './LeaderboardTeamInfo.jsx';
//import {useState} from 'react';
import data from '../../data/teamsData.json';
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
                oldElo={team.oldElo}
                key={crypto.randomUUID()}
            />
        );
    });

    return (
        <div>
            <div className="leaderboard__sticky-head">
                <div className="leaderboard__table-head">
                    <div className="leaderboard__table-logo">Team</div>
                    <div className="leaderboard__table-box leaderboard__gp">GP</div>
                    <div className="leaderboard__table-box">W</div>
                    <div className="leaderboard__table-box">L</div>
                    <div className="leaderboard__table-box">OTL</div>
                    <div className="leaderboard__table-box leaderboard__division">Division</div>
                    <div className="leaderboard__table-box leaderboard__elo">Elo</div>
                    <div className="leaderboard__table-box leaderboard__diff"></div>
                </div>
                
            </div>
            <div>
                {teamInfoComponents}
            </div>
            
        </div>
    );
}

export function eloSort (data) {
    data = data.sort((a, b) => b.elo - a.elo);
    return data;
}