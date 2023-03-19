import { TOrderData } from "../../types"
import { ORDERS_FEED_CONNECTION_CLOSED, ORDERS_FEED_CONNECTION_ERROR, ORDERS_FEED_CONNECTION_SUCCESS, ORDERS_FEED_GET_MESSAGE } from "../actions/actionTypes";
import { TOrdersFeedActions } from "../actions/orders-feed"

type TOrdersFeedState = {
    wsConnected: boolean;
    orders: TOrderData[] | null;
    total: number;
    totalToday: number;
    error?: Event | null;
};

const initialState: TOrdersFeedState = {
    wsConnected: false,
    orders: null,
    total: 0,
    totalToday: 0,
    error: null,
}

export const ordersFeedReducer = (state = initialState, action: TOrdersFeedActions) => {
    switch (action.type) {
        case ORDERS_FEED_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                error: null,
            }
        }
        case ORDERS_FEED_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
                orders: null
            }
        }
    
        case ORDERS_FEED_CONNECTION_CLOSED: {
            return {
                ...state,
                error: null,
                wsConnected: false,
                orders: null
            }
        }
    
        case ORDERS_FEED_GET_MESSAGE: {
            return {
                ...state,
                error: null,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }

        default:
            return state
    }
}