import React, { useState, useEffect, useContext } from 'react';
import style from './Search.module.css';
import bgPick from "../../../sherd/assets/picHome.jpg";
import { useSearchParams } from 'react-router-dom';
import { apiGet } from '../../../sherd/services/apiRequests';
import { Container, Grid } from '@mui/material';
import { GET_FAVORITES_BY_NAME_URL, GET_ITEMS_BY_NAME_URL } from '../../../sherd/constants/urls';
import Item from '../../item/Item';
import UserContext from '../../../sherd/contexts/userContext';

const Search = () => {
    const [searchParam] = useSearchParams();
    const { isRequestToGetCurrentUserDone } = useContext(UserContext);
    const [isHomePage, setIsHomePage] = useState(false);
    const [isFavoritePage, setIsFavoritePage] = useState(false);
    const [itemsInSearch, setItemsInSearch] = useState([]);

    const getFavoritesInSearch = async (name) => {
        const favorites = await apiGet(`${GET_FAVORITES_BY_NAME_URL}?name=${name}`, "sendToken");
        if (favorites.length) {
            favorites?.forEach(favorite => favorite.isFavorite = true);
        }
        setItemsInSearch(favorites);
    }
    const getItemsInSearch = async (name) => {
        const items = await apiGet(`${GET_ITEMS_BY_NAME_URL}?name=${name}`);
        setItemsInSearch(items);
    }
    useEffect(() => {
        if (searchParam.get("favorites")) {
            setIsFavoritePage(true);
            getFavoritesInSearch(searchParam.get("name"));
        } else {
            setIsHomePage(true);
            getItemsInSearch(searchParam.get("name"));
        }
    }, [searchParam]);

    return (
        <div>
            <div style={{ backgroundImage: `url("${bgPick}")` }} className={style['bg-image']}>
                <h1 className={style['h2-title']}>{searchParam.get("favorites") ? "Search Favorites" : "Search Items"}</h1>
            </div>
            <Container maxWidth='xl'>
                <Grid container spacing={3}>
                    {
                        !itemsInSearch?.length &&
                        <h2 className={style.noFound}>No {isFavoritePage ? "Favorites" : "Items"} found</h2>
                    }
                    {
                        (isRequestToGetCurrentUserDone && itemsInSearch.length) && itemsInSearch?.map((itemInSearch) =>
                            <Item item={itemInSearch} key={itemInSearch.id} isHomePage={isHomePage} isFavoritePage={isFavoritePage} />
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default Search;