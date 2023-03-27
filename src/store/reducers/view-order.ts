import { TOrderData } from "../../types"
import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/actionTypes"
import { TViewOrderActions } from "../actions/view-order"

export type TViewOrderState = {
    order: null | TOrderData,
    getOrderRequest: boolean,
    getOrderFailed: boolean,
}

const initialState: TViewOrderState = {
    order: null,
    
    getOrderRequest: false,
    getOrderFailed: false,
}

export const viewOrderReducer = (state = initialState, action: TViewOrderActions): TViewOrderState => {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {...state, order: null, getOrderRequest: true, getOrderFailed: false}
        }

        case GET_ORDER_SUCCESS: {
            return {...state, order: action.payload, getOrderRequest: false, getOrderFailed: false}
        }

        case GET_ORDER_FAILED: {
            return {...state, order: null, getOrderRequest: false, getOrderFailed: true}
        }

        default: {
            return state;
        }
    }
}