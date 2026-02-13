import githubLogo from '../assets/images/github-logo.svg';
import { Link } from 'react-router';


export default function MenuLinks ({openCloseClass, setOpenCloseClass}) {

    function closeMenu () {
        if (openCloseClass) {
            setOpenCloseClass("closed");
        }
    }

    return (
        <>
        <Link to="/" className="header__menu-link" onClick={closeMenu}><p>Leaderboard</p></Link>
        <Link to="/teams" className="header__menu-link" onClick={closeMenu}><p>Teams</p></Link>
        <a href="https://github.com/ethancoote/NHL-rank" className="header__button" target="_blank" rel="noreferrer">
            <img src={githubLogo} alt="github logo"/>
        </a>
        </>
    );
}