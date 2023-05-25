import { useState, useContext, useEffect } from 'react';
import { Grid, Paper, Box, Typography, Button } from '@mui/material';
import { BsCartPlus, BsCartDashFill, BsHeart, BsHeartFill } from "react-icons/bs";
import style from "./Item.module.css";
import { apiDelete, apiPost } from '../../sherd/services/apiRequests';
import { ADD_ITEM_TO_ORDER_URL, ADD_TO_FAVORITES_URL, REMOVE_FROM_FAVORITES_URL, REMOVE_ITEM_FROM_ORDER_URL } from '../../sherd/constants/urls';
import UserContext from '../../sherd/contexts/userContext';

const Item = ({ item, isHomePage = false, isFavoritePage = false, isOrderPage = false, order = {}, orderStatus = "", getUserOrders = () => { }, updateTotalPrice = () => { } }) => {
    const { currentUser } = useContext(UserContext);
    if (currentUser && !item.count && !localStorage.getItem(`${currentUser.id}count${item.id}`)) {
        item.count = 0;
    }
    const [isFavoriteItem, setIsFavoriteItem] = useState(item.isFavorite);
    const [isOrderedItem, setIsOrderedItem] = useState(true);
    const addToFavorite = async () => {
        await apiPost(ADD_TO_FAVORITES_URL, { id: item.id }, "sendToken");
        setIsFavoriteItem(true);
    }
    const removeFromFavorite = async () => {
        await apiDelete(REMOVE_FROM_FAVORITES_URL, { id: item.id }, "sendToken");
        setIsFavoriteItem(false);
    }
    const addItemToOrder = async () => {
        if (amount > 1) {
            await apiPost(ADD_ITEM_TO_ORDER_URL, { id: item.id }, "sendToken");
            setAmount(amount - 1);
            setCount(count + 1);
            if (isOrderPage) {
                updateTotalPrice(item.usd_price, "+");
            }
        } else if (amount > 0) {
            await apiPost(ADD_ITEM_TO_ORDER_URL, { id: item.id }, "sendToken");
            setAmount(amount - 1);
            setCount(count + 1);
            if (isOrderPage) {
                updateTotalPrice(item.usd_price, "+");
            }
        } else {
            alert("0 items left in stock. It is not possible to order more of the same item");
        }
    }
    const removeItemFromOrder = async () => {
        if (count > 1) {
            await apiDelete(REMOVE_ITEM_FROM_ORDER_URL, { item_id: item.id, order_id: order.id }, "sendToken");
            setCount(count - 1);
            setAmount(amount + 1);
            updateTotalPrice(item.usd_price, "-");
        } else {
            await apiDelete(REMOVE_ITEM_FROM_ORDER_URL, { item_id: item.id, order_id: order.id }, "sendToken");
            setCount(count - 1);
            setAmount(amount + 1);
            updateTotalPrice(item.usd_price, "-");
            setIsOrderedItem(false);
            getUserOrders();
        }
    }
    const [amount, setAmount] = useState(
        (currentUser && localStorage.getItem(`${currentUser?.id}amount${item.id}`)) ?
            JSON.parse(localStorage.getItem(`${currentUser.id}amount${item.id}`)) : item.amount
    );
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`${currentUser.id}amount${item.id}`, JSON.stringify(amount));
        }
    }, [amount]);
    const [count, setCount] = useState(
        (currentUser && localStorage.getItem(`${currentUser?.id}count${item.id}`)) && orderStatus != "CLOSE" ?
            JSON.parse(localStorage.getItem(`${currentUser.id}count${item.id}`)) : item.count
    );
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`${currentUser.id}count${item.id}`, JSON.stringify(count));
        }
    }, [count]);
    useEffect(() => {
        if (orderStatus == "CLOSE") {
            item.count = JSON.parse(localStorage.getItem(`${currentUser.id}count${item.id}`));
            setCount(item.count);
            localStorage.setItem(`${currentUser.id}count${item.id}`, JSON.stringify(0));
        }
    }, [orderStatus])

    return (
        <>
            {(isHomePage || (isFavoritePage && isFavoriteItem) || (isOrderPage && isOrderedItem)) &&
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Paper className={isOrderPage ? `${style.orderItemPaper}` : undefined} sx={{ paddingBottom: "18px" }} elevation={4}>
                        <div className={isOrderPage ? `${style.wrapperOrderItemImage}` : undefined}>
                            <Box className={!isOrderPage ? `${style.itemImage}` : `${style.orderItemImage}`} sx={{ backgroundImage: `url(${item.picture})` }}></Box>
                        </div>
                        <Box overflow={'hidden'} paddingX={1}>
                            <Typography variant='h5' component="h2">{item.title}</Typography>
                            <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>price: {item.usd_price} $</b></Typography>
                            <Typography className={!amount ? `${style.zero}` : undefined} sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2">{!isOrderPage && amount ? "amount:" : "amount in the store:"}{amount ? amount : `${amount} items left in stock`}</Typography>
                            {isOrderPage && <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>{"items in the order:"}{count}</b></Typography>}
                        </Box>
                        {currentUser && <Box marginTop={1} display={"flex"} alignItems={"center"} justifyContent="space-evenly">
                            {(!isOrderPage && !isFavoriteItem) &&
                                <Button style={{ padding: "12px", background: "#ccc" }} variant="contained" onClick={addToFavorite}>
                                    <BsHeart style={{ color: "white" }} /></Button>}
                            {(!isOrderPage && isFavoriteItem) &&
                                <Button style={{ padding: "12px", background: "white" }} variant="contained" onClick={removeFromFavorite}>
                                    <BsHeartFill style={{ color: 'red' }} /></Button>}
                            {(orderStatus != "CLOSE") && <Button style={{ background: "yellow" }} variant="contained" onClick={addItemToOrder}>
                                <BsCartPlus style={{ color: "black" }} size={24} />
                            </Button>}
                            {(isOrderPage && orderStatus != "CLOSE") &&
                                <Button style={{ background: "red" }} variant="contained" onClick={removeItemFromOrder}>
                                    <BsCartDashFill style={{ color: "black" }} size={24} />
                                </Button>}
                        </Box>}
                    </Paper>
                </Grid>}
        </>
    )
}

export default Item;