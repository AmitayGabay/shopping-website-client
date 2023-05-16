import React from 'react';
import style from './Order.module.css';
import { Paper, Box, Typography, Button } from '@mui/material';

const Order = ({ order }) => {
    return (
        <Paper className={style.orderPaper} elevation={4}>
            <Box overflow={'hidden'} paddingX={1} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} padding={"8px"}>
                <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>Order Opening date:</b> {order.order_date}</Typography>
                <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>Order Status:</b> {order.status}</Typography>
                <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>Shipping Address:</b> {order.shipping_address}</Typography>
            </Box>
            <Box marginTop={4} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <h2 style={{ background: "rgb(234, 234, 76)" }} variant="contained"><b>Total Price:</b> {order.total_price} $</h2>
            </Box>
            <Box marginTop={2} display={"flex"} alignItems={"center"} justifyContent="space-evenly">
                <Button style={{ background: "rgb(227, 204, 227)", color: "black" }} variant="outlined">To Order Process Page</Button>
            </Box>
        </Paper>
    )
}

export default Order;