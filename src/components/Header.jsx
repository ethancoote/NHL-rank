import { Link } from 'react-router';
import HeaderMenu from './HeaderMenu';
import nhlLogo from '../assets/images/nhl-logo.webp';
import './Header.css';

export default function Header () {
    return(
        <header className="header">
            <Link to="/" className="header__logo-wrap">
                <img src={nhlLogo} alt="nhl logo"/>
                <p className="header__title">NHL Rank</p>
            </Link>
            <HeaderMenu />
        </header>
    );
}