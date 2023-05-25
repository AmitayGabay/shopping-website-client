import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid } from '@mui/material';
import style from "./Favorites.module.css";
import bgPick from "../../../sherd/assets/picHome.jpg";
import { apiGet } from "../../../sherd/services/apiRequests";
import { GET_FAVORITES_URL } from "../../../sherd/constants/urls";
import Item from '../../item/Item';
import UserContext from '../../../sherd/contexts/userContext';

const Favorites = () => {
    const { isRequestToGetCurrentUserDone } = useContext(UserContext);
    const [isFavoritePage, setIsFavoritePage] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const getFavorites = async () => {
        const data = await apiGet(GET_FAVORITES_URL, "sendToken");
        data.forEach(favorite => favorite.isFavorite = true);
        setFavorites(data);
    };
    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <div>
            <div style={{ backgroundImage: `url("${bgPick}")` }} className={style['bg-image']}>
                <h1 className={style['h2-title']}>My Favorites</h1>
            </div>
            <Container maxWidth='xl'>
                <Grid container spacing={3}>
                    {
                        isRequestToGetCurrentUserDone && favorites?.map((favorite) =>
                            <Item item={favorite} isFavoritePage={isFavoritePage} key={favorite.id} />
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default Favorites;