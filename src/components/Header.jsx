import './Header.css';

export default function Header () {
    return(
        <div className="header">
            <div className="header__logo-wrap">
                <p>App Title</p>
            </div>
            <a href="/" className="header__button">
                <p>Placeholder CTA</p>
            </a>
        </div>
    );
}