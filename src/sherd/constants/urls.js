const BASE_URL = "http://localhost:9000/";
const USER_URL = BASE_URL + "user/";
const ITEM_URL = BASE_URL + "item/";
const ORDER_URL = BASE_URL + "order/";

// user
const REGISTER_URL = USER_URL + "register";
const SIGNIN_URL = BASE_URL + "authenticate";
const DELETE_USER_URL = USER_URL + "delete-user";
const GET_USER_BY_ID_URL = USER_URL + "search";
const GET_USER_BY_EMAIL_URL = USER_URL + "search";
const GET_USER_BY_USERNAME_URL = USER_URL;
const GET_ALL_USERS_URL = USER_URL + "all-users";

// item
const ADD_TO_FAVORITES_URL = ITEM_URL + "add-to-favorites";
const REMOVE_FROM_FAVORITES_URL = ITEM_URL + "remove-from-favorites";
const GET_FAVORITES_URL = ITEM_URL + "get-favorites";
const GET_ITEM_BY_ID_URL = ITEM_URL + "search";
const GET_ALL_ITEMS_URL = ITEM_URL + "all-items";
const GET_ITEMS_BY_NAME_URL = ITEM_URL + "search";
const GET_FAVORITES_BY_NAME_URL = ITEM_URL + "favorites";
const GET_ALL_FAVORITES_URL = ITEM_URL + "all-favorites";

// order
const GET_ORDER_BY_ID_URL = ORDER_URL;
const ADD_ITEM_TO_ORDER_URL = ORDER_URL + "add-item-to-order";
const GET_USER_ORDERS_URL = ORDER_URL + "user-orders";
const GET_ORDER_ITEMS_URL = ORDER_URL + "order-items";
const REMOVE_ITEM_FROM_ORDER_URL = ORDER_URL + "remove-item-from-order";
const CLOSE_ORDER_URL = ORDER_URL + "close";
const GET_ALL_ORDERS_URL = ORDER_URL + "all-orders";
const UPDATE_ADDRESS_IN_ORDER_URL = ORDER_URL + "update-address-in-order";



export {
    BASE_URL as default,
    // user
    REGISTER_URL,
    SIGNIN_URL,
    DELETE_USER_URL,
    GET_USER_BY_ID_URL,
    GET_USER_BY_EMAIL_URL,
    GET_USER_BY_USERNAME_URL,
    GET_ALL_USERS_URL,
    // item
    ADD_TO_FAVORITES_URL,
    REMOVE_FROM_FAVORITES_URL,
    GET_FAVORITES_URL,
    GET_ITEM_BY_ID_URL,
    GET_ALL_ITEMS_URL,
    GET_ITEMS_BY_NAME_URL,
    GET_FAVORITES_BY_NAME_URL,
    GET_ALL_FAVORITES_URL,
    // order
    GET_ORDER_BY_ID_URL,
    ADD_ITEM_TO_ORDER_URL,
    GET_USER_ORDERS_URL,
    GET_ORDER_ITEMS_URL,
    REMOVE_ITEM_FROM_ORDER_URL,
    CLOSE_ORDER_URL,
    GET_ALL_ORDERS_URL,
    UPDATE_ADDRESS_IN_ORDER_URL,
} 