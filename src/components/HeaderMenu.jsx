import './HeaderMenu.css';
import { useState, useEffect } from 'react';
import MenuLinks from './MenuLinks';
import BurgerMenu from './BurgerMenu';

export default function HeaderMenu () {
    const [openCloseClass, setOpenCloseClass] = useState("closed");

    // don't allow scrolling when menu is open
    useEffect(() => {
        if (openCloseClass === "opened") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [openCloseClass])

    return (
        <>
        <div className="header__menu">
            <MenuLinks />
            <BurgerMenu openCloseClass={openCloseClass} setOpenCloseClass={setOpenCloseClass}/>
        </div>
        <div className={`header__menu-mobile ${openCloseClass}`}>
            <MenuLinks openCloseClass={openCloseClass} setOpenCloseClass={setOpenCloseClass}/>
        </div>
        </>
    );
}