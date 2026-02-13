import { render, screen } from '@testing-library/react';
import teamsData from './data/teamsData.json';
import App from './App';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Header from './components/Header';
import Footer from './components/Footer';

test('Leaderboard Exists', () => {
  render(<App />);
  const element = screen.getByText('Leaderboard', {selector: 'h1'});
  expect(element).toBeInTheDocument();
});

test('Upcoming Games Exists', () => {
  render(<App />);
  const element = screen.getByText('Upcoming Games', {selector: 'h2'});
  expect(element).toBeInTheDocument();
});

test('All Teams Ranked', () => {
  render(<Leaderboard />);
  for (let i = 0; i < teamsData.length; i++) {
    const teamName = screen.getByText(teamsData[i].teamAbbrev);
    expect(teamName).toBeInTheDocument();
  }
});

test('Header Images', () => {
  render(<Header />);
  const logo = screen.getByAltText('nhl logo');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('src', './assets/images/nhl-logo.webp');
  const gitHubLogo = screen.getByAltText('github logo');
  expect(gitHubLogo).toBeInTheDocument();
  expect(gitHubLogo).toHaveAttribute('src', './assets/images/github-logo.svg');
});

test('Footer Images', () => {
  render(<Footer />);
  const logo = screen.getByAltText('nhl logo');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('src', './assets/images/nhl-logo.webp');
});