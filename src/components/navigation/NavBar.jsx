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
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        if (!searchValue.trim().length)
            return;
        if (window.location.href.includes("favorites")) {
            navigate('/search?name=' + searchValue + '&favorites=' + true)
        } else {
            navigate('/search?name=' + searchValue);
        }
    }
    const deleteUser = async () => {
        await apiDelete(DELETE_USER_URL, {}, "sendToken");
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
            <div className={`${style.navLinks} ${style.navOpenNav}`} >
                {isRequestToGetCurrentUserDone && !currentUser && navBarLinks.map(({ value, to }) =>
                    <Link className={style.navLink} key={value} to={to} >{value}</Link>
                )}
                {isRequestToGetCurrentUserDone && currentUser &&
                    userNavBarLinks.map(({ value, to }) =>
                        <span className={style.navLink} key={value}
                            onClick={async () => {
                                if (value == "favorites") {
                                    navigate(to);
                                }
                                if (value == "orders") {
                                    navigate(to);
                                }
                                if (value == "delete") {
                                    await deleteUser();
                                    navigate(to);
                                    window.location.reload(true);
                                }
                                if (value == "sign out" || value == "delete") {
                                    localStorage.removeItem("Authorization");
                                    updateCurrentUser(null);
                                    navigate(to);
                                    window.location.reload(true);
                                }
                            }
                            }
                        >{value}</span>
                    )}
            </div>
        </nav>
        <Outlet />
    </>
    )
}

export default NavBar;