import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import style from "./Home.module.css";
import bgPick from "../../../sherd/assets/picHome.jpg";
import { apiGet } from "../../../sherd/services/apiRequests";
import { GET_ALL_ITEMS_URL } from "../../../sherd/constants/urls";
import Item from '../../item/Item';

const Home = () => {
    const [items, setItems] = useState([]);
    const getItems = async () => {
        const data = await apiGet(GET_ALL_ITEMS_URL);
        setItems(data);

    };
    useEffect(() => {
        getItems()
    }, []);

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