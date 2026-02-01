import './Leaderboard.css';
import data from '../data/teamsData.json';

import {useState} from 'react';

export default function Leaderboard () {
    const [teamData, setTeamData] = useState(data);
    allTeamLines(teamData);
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
        </div>
    );
}

function teamLine (team) {
    
    return (
        <div className="leaderboard__team-line">
            <img src={team.teamLogo} alt="team logo"></img>
            <p>{team.teamAbbrev}</p>
            <p>{team.elo}</p>
        </div>
    );
}

function allTeamLines (teamData) {
    let allTeamLines = [];
    for (let i = 0; i < teamData.length -1; i++) {
        if (teamData[i] !== undefined) {
            allTeamLines.push(teamLine(teamData[i]));
        } else {
            console.error("oof");
        }
        
    }

    return (
        <>
            
        </>
    );
}