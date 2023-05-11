import React, { useState, useContext } from 'react';
import logo from "../../sherd/assets/online shop.png";
import { navBarLinks, userNavBarLinks } from "./navBarLinks";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from "./NavBar.module.css";
import UserContext from "../../sherd/contexts/userContext";

const NavBar = () => {
    const { currentUser, updateCurrentUser } = useContext(UserContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        if (searchValue.length)
            navigate('/search?s=' + searchValue);
    }
    return (<>
        <nav className={style.nav}>
            <div className={style.navWrapperLogo} >
                <div onClick={() => navigate('/')} className={style.navLogo} style={{ backgroundImage: `url("${logo}")` }} ></div>
            </div>
            <div className={style.navWrapperFullInput}>
                <div className={style.navWrapperInput} >
                    <input type='search' value={searchValue} onChange={({ target: { value } }) => setSearchValue(value)} className={style.navInput} onKeyDown={({ key }) => key == 'Enter' && handleClick()} />
                </div>
                <button onClick={handleClick} className={style.navSearchButton} >
                    Search
                </button>
            </div>
            {currentUser &&
                <div className={style.userEmail}>
                    <h2>{currentUser?.email}</h2>
                </div>}
            <div className={isNavOpen ? `${style.navLinks} ${style.navOpenNav}` : `${style.navLinks} ${style.navCloseNav}`} >
                {!currentUser && navBarLinks.map(({ value, to }) =>
                    <Link className={style.navLink} key={to} to={to} >{value}</Link>
                )}
                {currentUser &&
                    userNavBarLinks.map(({ value, to }) =>
                        <Link className={style.navLink} key={to} to={to}
                            onClick={() => {
                                if (value == "sign out") {
                                    localStorage.removeItem("Authorization");
                                    updateCurrentUser(null);
                                }
                            }
                            }
                        >{value}</Link>
                    )}
            </div>
        </nav>
        <Outlet />
    </>
    )
}

export default NavBar;