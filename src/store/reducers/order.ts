import { TOrder } from "../../types";
import { TOrderActions } from "../actions/order"
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED} from '../actions/actionTypes'

export type TOrderState = {
    order: null | TOrder,
    orderRequest: boolean,
    orderFailed: boolean,
}

export const initialState: TOrderState = {
    order: null,
    
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch(action.type) {
        case MAKE_ORDER_REQUEST: {
            return { ...state, orderRequest: true, orderFailed: false }
        }
        case MAKE_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                order: { number: action.payload.number }
            }
        }
        case MAKE_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                order: null,
            }
        }
        default:
            return state;
    }
}