import React, { useState } from 'react';
import style from './Order.module.css';
import { Paper, Box, Typography, Button, Modal, Card, TextField } from '@mui/material';
import { apiGet, apiPut } from '../../sherd/services/apiRequests';
import { CLOSE_ORDER_URL, GET_ORDER_BY_ID_URL, GET_ORDER_ITEMS_URL, UPDATE_ADDRESS_IN_ORDER_URL } from '../../sherd/constants/urls';
import Item from '../item/Item';

const Order = ({ order, getUserOrders }) => {
    console.log(order);
    const [isOpen, setIsOpen] = useState(false);
    const [itemsInOrder, setItemsInOrder] = useState(null);
    const [isOrderPage, setIsOrderPage] = useState(true);
    const [orderDate, setOrderDate] = useState(order.order_date);
    const [totalPrice, setTotalPrice] = useState(order.total_price);
    const [shippingAddress, setShippingAddress] = useState("");
    const [updatedShippingAddress, setUpdatedShippingAddress] = useState(order.shipping_address);
    const [orderStatus, setOrderStatus] = useState(order.status);

    const updateTotalPrice = async (itemPrice, action) => {
        console.log(itemPrice, action);
        if (action == "+") {
            setTotalPrice(totalPrice + itemPrice);
        } else {
            setTotalPrice(totalPrice - itemPrice);
        }
    }
    const updateShippingAddress = async () => {
        if (!shippingAddress || !shippingAddress.trim().length) {
            return;
        }
        const formDetails = {
            order_id: order.id,
            shipping_address: shippingAddress
        }
        await apiPut(UPDATE_ADDRESS_IN_ORDER_URL, formDetails, "sendToken");
        setUpdatedShippingAddress(shippingAddress);
        setShippingAddress("");
    }
    const payForOrder = async () => {
        await apiPut(`${CLOSE_ORDER_URL}?id=${order.id}`, {}, "sendToken");
        const closedOrder = await apiGet(`${GET_ORDER_BY_ID_URL}?orderid=${order.id}`, "sendToken");
        setOrderDate(closedOrder.order_date);
        setOrderStatus("CLOSE");
    }
    const openModal = async () => {
        const orderItems = await apiGet(`${GET_ORDER_ITEMS_URL}?id=${order.id}`, "sendToken");
        const filteredItems = Object.values(
            orderItems.reduce((acc, obj) => {
                const { id } = obj;
                if (acc[id]) {
                    acc[id].count++;
                } else {
                    acc[id] = { ...obj, count: 1 };
                }
                return acc;
            }, {})
        );
        setItemsInOrder(filteredItems);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <Paper className={style.orderPaper} elevation={4}>
            <Box overflow={'hidden'} paddingX={1} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} padding={"8px"}>
                <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>{(orderStatus != "CLOSE") ? "Order Opening Date:" : "Order Closing Date:"}</b> {orderDate}</Typography>
                <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>Order Status:</b> {orderStatus}</Typography>
                <Typography sx={{ fontSize: "17px", lineHeight: "18px" }} whiteSpace={"pre-wrap"} variant='subtitle2' component="h2"><b>Shipping Address:</b> {updatedShippingAddress}</Typography>
            </Box>
            <Box marginTop={4} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <h2 style={{ background: "rgb(234, 234, 76)" }} variant="contained"><b>Total Price:</b> {totalPrice} $</h2>
            </Box>
            <Box marginTop={2} display={"flex"} alignItems={"center"} justifyContent="space-evenly">
                <Button style={{ background: "rgb(227, 204, 227)", color: "black" }} variant="outlined" onClick={openModal}>Go to the ordering process</Button>
            </Box>

            <Modal open={isOpen} onClose={closeModal}>
                <Card className={style.modalCard}>
                    <h1 className={style.title}>Order number {order.id}</h1>
                    <div className={(orderStatus == "CLOSE") ? `${style.closeWrapperItems}` : `${style.wrapperItems}`}>
                        {
                            itemsInOrder?.map((itemInOrder) =>
                                <Item item={itemInOrder} key={itemInOrder.id} isOrderPage={isOrderPage} order={order} orderStatus={orderStatus} getUserOrders={getUserOrders} updateTotalPrice={updateTotalPrice} />
                            )
                        }
                    </div>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <h2 style={{ background: "rgb(234, 234, 76)" }} variant="contained"><b>Total Price:</b> {totalPrice} $</h2>
                    </Box>
                    {(orderStatus == "CLOSE") &&
                        <div className={style.closedShippingAddress}>
                            <h3>The order was sent to the address: {`${updatedShippingAddress}`}</h3>
                        </div>
                    }
                    {(orderStatus != "CLOSE") &&
                        <div className={style.shippingAddress}>
                            <TextField
                                fullWidth
                                autoFocus
                                type='text'
                                placeholder={updatedShippingAddress}
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                style={{ background: "rgb(32, 139, 112)" }}
                                onClick={updateShippingAddress}
                            >
                                update shipping address
                            </Button>
                        </div>}
                    {(orderStatus != "CLOSE") &&
                        <span className={style.span}>(optional)</span>}
                    {(orderStatus != "CLOSE") &&
                        <div className={style.payment}>
                            <Button
                                variant="contained"
                                style={{ background: "rgb(209, 46, 100)" }}
                                onClick={payForOrder}
                            >
                                for payment
                            </Button>
                        </div>}
                </Card>
            </Modal>
        </Paper>
    )
}

export default Order;