import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid } from '@mui/material';
import style from "./Home.module.css";
import bgPick from "../../../sherd/assets/picHome.jpg";
import { apiGet } from "../../../sherd/services/apiRequests";
import { GET_ALL_ITEMS_URL, GET_FAVORITES_URL } from "../../../sherd/constants/urls";
import Item from '../../item/Item';
import UserContext from "../../../sherd/contexts/userContext";

const Home = () => {
    const { currentUser, isRequestToGetCurrentUserDone } = useContext(UserContext);
    const [itemsData, setItemsData] = useState(null);
    const [items, setItems] = useState([]);

    console.log(items);

    const getFavorites = async () => {
        if (currentUser && itemsData) {
            const favoritesData = await apiGet(GET_FAVORITES_URL, "sendToken");
            if (favoritesData.length > 0) {
                for (let i = 0; i < favoritesData.length; i++) {
                    itemsData.forEach(item => {
                        if (item.id == favoritesData[i].id) {
                            item.isFavorite = true;
                        }
                    })
                }
            }
        }
        if (isRequestToGetCurrentUserDone && itemsData) {
            setItems(itemsData);
        }
    };
    const getItemsData = async () => {
        const data = await apiGet(GET_ALL_ITEMS_URL);
        setItemsData(data);
    };

    useEffect(() => {
        getItemsData();
    }, []);

    useEffect(() => {
        getFavorites();
    }, [isRequestToGetCurrentUserDone && itemsData]);

    return (
        <div>
            <div style={{ backgroundImage: `url("${bgPick}")` }} className={style['bg-image']}>
                <h1 className={style['h2-title']}>AMITAY STORE</h1>
            </div>
            <Container maxWidth='xl'>
                <Grid container spacing={3}>
                    {
                        items?.map((item, i) =>
                            <Item item={item} key={i} />
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default Home;