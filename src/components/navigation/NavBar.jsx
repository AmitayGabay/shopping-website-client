import React, { useState, useContext } from 'react';
import logo from "../../sherd/assets/online shop.png";
import { navBarLinks, userNavBarLinks } from "./navBarLinks";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from "./NavBar.module.css";
import UserContext from "../../sherd/contexts/userContext";
import { DELETE_USER_URL } from '../../sherd/constants/urls';
import { apiDelete } from '../../sherd/services/apiRequests';

const NavBar = () => {
    const { currentUser, updateCurrentUser, isRequestToGetCurrentUserDone } = useContext(UserContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        if (searchValue.length)
            navigate('/search?s=' + searchValue);
    }
    const deleteUser = async () => {
        console.log('deleteUser')
        await apiDelete(DELETE_USER_URL, "sendToken");
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
            {isRequestToGetCurrentUserDone && currentUser &&
                <div className={style.userEmail}>
                    <h2>{currentUser?.email}</h2>
                </div>}
            <div className={isNavOpen ? `${style.navLinks} ${style.navOpenNav}` : `${style.navLinks} ${style.navCloseNav}`} >
                {isRequestToGetCurrentUserDone && !currentUser && navBarLinks.map(({ value, to }) =>
                    <Link className={style.navLink} key={to} to={to} >{value}</Link>
                )}
                {isRequestToGetCurrentUserDone && currentUser &&
                    userNavBarLinks.map(({ value, to }) =>
                        <Link className={style.navLink} key={to} to={to}
                            onClick={async () => {
                                if (value == "delete") {
                                    await deleteUser();
                                }
                                if (value == "sign out" || value == "delete") {
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