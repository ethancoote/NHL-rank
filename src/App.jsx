import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import TeamHome from './pages/TeamHome.jsx';
import Home from './pages/Home.jsx';
import { Route, Routes} from 'react-router';
import teamsData from './data/teamsData.json';
import './App.css';

function App() {

  const teamRoutes = getTeamRoutes();

  return (
    <>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        {teamRoutes}
      </Routes>
    </div>
    <Footer />
    </>
  );
}

function getTeamRoutes () {
  let routeArray = [];
  for (let i = 0; i < teamsData.length; i++) {
    const teamPath = `/teams/${teamsData[i].teamAbbrev}`;
    routeArray.push(<Route path={teamPath} element={<TeamHome teamData={teamsData[i]}/>}></Route>);
  }
  return routeArray;
}

export default App;
