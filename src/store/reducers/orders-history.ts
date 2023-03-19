import { TOrderData } from "../../types"
import { ORDERS_HISTORY_CONNECTION_CLOSED, ORDERS_HISTORY_CONNECTION_ERROR, ORDERS_HISTORY_CONNECTION_SUCCESS, ORDERS_HISTORY_GET_MESSAGE } from "../actions/actionTypes";
import { TOrdersHistoryActions } from "../actions/orders-history";

type TOrdersHistoryState = {
    wsConnected: boolean;
    orders: TOrderData[] | null;
    total: number;
    totalToday: number;
    error?: Event | null;
};

const initialState: TOrdersHistoryState = {
    wsConnected: false,
    orders: null,
    total: 0,
    totalToday: 0,
    error: null,
}

export const ordersHistoryReducer = (state = initialState, action: TOrdersHistoryActions) => {
    switch (action.type) {
        case ORDERS_HISTORY_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                error: null,
            }
        }

        case ORDERS_HISTORY_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                orders: null,
                wsConnected: false,
            }
        }
    
        case ORDERS_HISTORY_CONNECTION_CLOSED: {
            return {
                ...state,
                error: null,
                orders: null,
                wsConnected: false,
            }
        }
    
        case ORDERS_HISTORY_GET_MESSAGE: {
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