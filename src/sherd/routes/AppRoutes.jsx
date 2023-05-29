import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../../components/navigation/NavBar';
import Search from '../../components/pages/search/Search';
import Home from '../../components/pages/home/Home';
import Login from '../../components/pages/connection/Login';
import Register from '../../components/pages/registration/Register';
import Orders from '../../components/pages/orders/Orders';
import Favorites from '../../components/pages/favorites/Favorites';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route index element={<Home />} />
                <Route path='search' element={<Search />} />
                <Route path='sign-up' element={<Register />} />
                <Route path='sign-in' element={<Login />} />
                <Route path='favorites' element={<Favorites />} />
                <Route path='orders' element={<Orders />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes;