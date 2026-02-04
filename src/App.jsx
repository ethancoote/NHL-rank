import './App.css';
import Header from './components/Header.jsx';
import Leaderboard from './components/Leaderboard/Leaderboard.jsx';
import UpcomingGameList from './components/UpcomingGameList/UpcomingGameList.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <section className="section">

        <div className="box across start">
          <Leaderboard />
          <UpcomingGameList />
          
        </div>
      </section>
      
    </div>
  );
}

export default App;
