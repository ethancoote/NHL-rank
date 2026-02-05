import './Footer.css';

export default function Footer () {
    return (
        <footer className="footer">
            <div className="section across">
                <div className="box">
                    <div className="footer__logo-wrap">
                        <img src="./assets/images/nhl-logo.webp" alt="nhl logo"/>
                        <p className="footer__logo-text">NHL RANK</p>
                    </div>
                    <p>This is an unofficial NHL Elo ranking. This ranking has no association with the NHL.</p>
                    <div className="divider"></div>
                    <p className="copyright">copyright © Ethan Coote Web Development 2026</p>
                </div>
                
            </div>
        </footer>
    );
}