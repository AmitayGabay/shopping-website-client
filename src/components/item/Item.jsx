import React from 'react';
import { Grid, Paper, Box, Typography, Button } from '@mui/material';
import { BsCartPlus } from "react-icons/bs";
import style from "./Item.module.css";

const Item = ({ item }) => {
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper sx={{ paddingBottom: "18px" }} elevation={4}>
                <Box className={style.itemImage} sx={{ backgroundImage: `url(${item.picture})` }}></Box>
                <Box sx={{ direction: "rtl" }} overflow={'hidden'} paddingX={1}>
                    <Typography variant='h5' component="h2">{item.title}</Typography>
                    <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>$ price: {item.usd_price}</b></Typography>
                    <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2">amount: {item.amount}</Typography>
                </Box>
                <Box marginTop={1} display={"flex"} alignItems={"center"} justifyContent="space-evenly">
                    <Button style={{ background: "rgb(234, 234, 76)", color: "black" }} variant="contained">add to favourites</Button>
                    <Button style={{ background: "rgb(44, 169, 44)" }} variant="contained" ><BsCartPlus style={{ color: "black" }} size={24} /></Button>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Item;