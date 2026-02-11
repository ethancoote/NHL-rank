import { useState } from 'react';
import Leaderboard from '../components/Leaderboard/Leaderboard';
import UpcomingGameList from '../components/UpcomingGameList/UpcomingGameList';


export default function Home () {
    const [display, setDisplay] = useState('leaderboard');

    function updateDisplay (e) {
        const buttonId = e.target.id;
        if (buttonId === "leaderboard-button" && display !== 'leaderboard') {
        setDisplay('leaderboard');
        } else if (buttonId === "upcoming-button" && display !== 'upcoming') {
        setDisplay('upcoming');
        }
    }

    return (
        <>
        <main className="section">
            <div className="mobile-toggle">
                <button className={display} id="leaderboard-button" onClick={updateDisplay}>Leaderboard</button>
                <button className={display} id="upcoming-button" onClick={updateDisplay}>Upcoming Games</button>
            </div>
            <div className="box homepage-hero">
            <Leaderboard display={display}/>
            <UpcomingGameList display={display}/>
            
            </div>
        </main>
        </>
    );
}