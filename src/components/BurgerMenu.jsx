import './BurgerMenu.css';

export default function BurgerMenu ({openCloseClass, setOpenCloseClass}) {

    function openClose () {
        if (openCloseClass === "closed") {
            setOpenCloseClass("opened");
        } else {
            setOpenCloseClass("closed");
        }
    }

    return (
        <button className="burger-menu" onClick={openClose} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 12" fill="none" id={openCloseClass}>
                <line x1="1" y1="11" x2="15" y2="11" stroke="black" strokeWidth="2" strokeLinecap="round" id="line1"/>
                <line x1="1" y1="6" x2="15" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round" id="line2"/>
                <line x1="1" y1="1" x2="15" y2="1" stroke="black" strokeWidth="2" strokeLinecap="round" id="line3"/>
            </svg>
        </button>
    );
}