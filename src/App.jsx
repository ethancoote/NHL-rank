import './App.css';
import Header from './components/Header.jsx';
import Leaderboard from './components/Leaderboard.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="spacer"></div>
      <section className="section">
        <div className="box">
          <h1 className="text-center">Title goes here.</h1>
          <Leaderboard />
        </div>
      </section>
      
    </div>
  );
}

export default App;
