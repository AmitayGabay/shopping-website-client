import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from '../../components/navigation/NavBar';
import Search from '../../components/pages/search/Search';
import Home from '../../components/pages/home/Home';
import Login from '../../components/connection/Login';
import Register from '../../components/registration/Register';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<NavBar />}>
                <Route index element={<Home />} />
                <Route path='search' element={<Search />} />
                <Route path='sign-up' element={<Register />} />
                <Route path='sign-in' element={<Login />} />
                <Route path='favourites' element={<Search />} />
                <Route path='orders' element={<Search />} />
            </Route>
        </Routes>
    )
}
export default AppRoutes