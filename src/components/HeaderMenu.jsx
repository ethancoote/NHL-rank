import './HeaderMenu.css';
import { useState } from 'react';
import MenuLinks from './MenuLinks';
import BurgerMenu from './BurgerMenu';

export default function HeaderMenu () {

    const [openCloseClass, setOpenCloseClass] = useState("closed");

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