import { useState, useEffect } from 'react';
import style from "./Orders.module.css";
import bgPick from "../../../sherd/assets/picHome.jpg";
import Order from '../../order/Order';
import { apiGet } from '../../../sherd/services/apiRequests';
import { GET_USER_ORDERS_URL } from '../../../sherd/constants/urls';

const Orders = () => {
    const [userOrders, setUserOrders] = useState([]);

    const getUserOrders = async () => {
        const orders = await apiGet(GET_USER_ORDERS_URL, "sendToken");
        orders.reverse();
        setUserOrders(orders);
    }
    useEffect(() => {
        getUserOrders();
    }, [])
    return (
        <div>
            <div style={{ backgroundImage: `url("${bgPick}")` }} className={style['bg-image']}>
                <h1 className={style['h2-title']}>My Orders</h1>
            </div>
            {userOrders?.map((order) => <Order order={order} key={order.id} getUserOrders={getUserOrders} />)}
        </div>
    )
}

export default Orders;