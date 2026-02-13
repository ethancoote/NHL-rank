import { Link } from 'react-router';
import HeaderMenu from './HeaderMenu';
import './Header.css';

export default function Header () {
    return(
        <header className="header">
            <Link to="/" className="header__logo-wrap">
                <img src="../assets/images/nhl-logo.webp" alt="nhl logo"/>
                <p className="header__title">NHL Rank</p>
            </Link>
            <HeaderMenu />
        </header>
    );
}