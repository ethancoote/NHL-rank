import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import TeamHome from './pages/TeamHome.jsx';
import Home from './pages/Home.jsx';
import Teams from './pages/Teams.jsx';
import { Route, Routes } from 'react-router';
import teamsData from './data/teamsData.json';
import { eloSort } from './components/Leaderboard/LeaderboardAllTeamsInfo.jsx';
import './App.css';

function App() {

  const teamRoutes = getTeamRoutes();

  return (
    <>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/teams" element={<Teams teamsData={teamsData}/>}/>
        {teamRoutes}
      </Routes>
    </div>
    
    <Footer />
    </>
  );
}

function getTeamRoutes () {
  let routeArray = [];
  const orderedTeamArray = eloSort(teamsData);
  for (let i = 0; i < orderedTeamArray.length; i++) {
    const teamPath = `/teams/${orderedTeamArray[i].teamAbbrev}`;
    routeArray.push(<Route path={teamPath} element={<TeamHome teamData={orderedTeamArray[i]} eloRank={i+1} allTeamsData={teamsData} />}></Route>);
  }
  return routeArray;
}

export default App;