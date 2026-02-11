import { Link } from 'react-router';
import './Header.css';

export default function Header () {
    return(
        <header className="header">
            <Link to="/" className="header__logo-wrap">
                <img src="../assets/images/nhl-logo.webp" alt="nhl logo"/>
                <p className="header__title">NHL Rank</p>
            </Link>
            <a href="https://github.com/ethancoote/NHL-rank" className="header__button" target="_blank" rel="noreferrer">
                <img src="../assets/images/github-logo.svg" alt="github logo"/>
            </a>
        </header>
    );
}