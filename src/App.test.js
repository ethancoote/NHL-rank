import { render, screen } from '@testing-library/react';
import teamsData from './data/teamsData.json';
import App from './App';
import Leaderboard from './components/Leaderboard/Leaderboard';
import { HashRouter } from 'react-router';

test('Leaderboard Exists', () => {
  render(<HashRouter><App /></HashRouter>);
  const element = screen.getByText('Leaderboard', {selector: 'h1'});
  expect(element).toBeInTheDocument();
});

test('Upcoming Games Exists', () => {
  render(<HashRouter><App /></HashRouter>);
  const element = screen.getByText('Upcoming Games', {selector: 'h2'});
  expect(element).toBeInTheDocument();
});

test('All Teams Ranked', () => {
  render(<HashRouter><Leaderboard/></HashRouter>);
  for (let i = 0; i < teamsData.length; i++) {
    const teamName = screen.getByText(teamsData[i].teamAbbrev);
    expect(teamName).toBeInTheDocument();
  }
});