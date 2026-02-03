import './App.css';
import Header from './components/Header.jsx';
import Leaderboard from './components/Leaderboard.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <section className="section">
        <div className="box">
          <h1 className="text-center">NHL Rank</h1>
          <p className="subtitle">The Unofficial NHL Elo Rating Leaderboard</p>
          <Leaderboard />
        </div>
      </section>
      
    </div>
  );
}

export default App;
