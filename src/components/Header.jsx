import './Header.css';

export default function Header () {
    return(
        <header className="header">
            <div className="header__logo-wrap">
                <img src="./assets/images/nhl-logo.webp" alt="nhl logo"/>
                <p className="header__title">NHL RANK</p>
            </div>
            <a href="https://github.com/ethancoote/NHL-rank" className="header__button" target="_blank" rel="noreferrer">
                <img src="./assets/images/github-logo.svg" alt="github logo"/>
            </a>
        </header>
    );
}