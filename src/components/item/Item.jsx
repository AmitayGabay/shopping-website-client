import { useState, useContext } from 'react';
import { Grid, Paper, Box, Typography, Button } from '@mui/material';
import { BsCartPlus } from "react-icons/bs";
import style from "./Item.module.css";
import { apiDelete, apiPost } from '../../sherd/services/apiRequests';
import { ADD_TO_FAVORITES_URL, REMOVE_FROM_FAVORITES_URL } from '../../sherd/constants/urls';
import UserContext from '../../sherd/contexts/userContext';

const Item = ({ item, isFavoritePage = false }) => {
    const { currentUser } = useContext(UserContext);
    const [isFavoriteItem, setIsFavoriteItem] = useState(item.isFavorite);
    console.log(item.isFavorite);
    const addToFavorite = async () => {
        await apiPost(ADD_TO_FAVORITES_URL, "sendToken", { id: item.id });
        setIsFavoriteItem(true);
    }
    const removeFromFavorite = async () => {
        await apiDelete(REMOVE_FROM_FAVORITES_URL, "sendToken", { id: item.id });
        setIsFavoriteItem(false);
    }

    return (
        <>
            {(!isFavoritePage || (isFavoritePage && isFavoriteItem)) &&
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Paper sx={{ paddingBottom: "18px" }} elevation={4}>
                        <Box className={style.itemImage} sx={{ backgroundImage: `url(${item.picture})` }}></Box>
                        <Box overflow={'hidden'} paddingX={1}>
                            <Typography variant='h5' component="h2">{item.title}</Typography>
                            <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>price: {item.usd_price} $</b></Typography>
                            <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2">amount: {item.amount}</Typography>
                        </Box>
                        {currentUser && <Box marginTop={1} display={"flex"} alignItems={"center"} justifyContent="space-evenly">
                            {!isFavoriteItem && <Button style={{ background: "rgb(234, 234, 76)", color: "black" }} variant="contained" onClick={addToFavorite}>add to favorites</Button>}
                            {isFavoriteItem && <Button style={{ background: "rgb(255, 102, 41)", color: "black" }} variant="contained" onClick={removeFromFavorite}>remove from favorites</Button>}
                            <Button style={{ background: "rgb(44, 169, 44)" }} variant="contained" ><BsCartPlus style={{ color: "black" }} size={24} /></Button>
                        </Box>}
                    </Paper>
                </Grid>}
        </>
    )
}

export default Item;