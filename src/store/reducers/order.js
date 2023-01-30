import { HIDE_ORDER_DETAIL_MODAL, MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, SHOW_ORDER_DETAIL_MODAL } from "../actions/order";

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,

    isOrderDetailModalShowing: false,
}

export const orderReducer = (state = initialState, action) => {
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
        case SHOW_ORDER_DETAIL_MODAL: {
            return {
                ...state, 
                isOrderDetailModalShowing: true,
                order: { ...state.order }
            }
        }
        case HIDE_ORDER_DETAIL_MODAL: {
            return {
                ...state, 
                isOrderDetailModalShowing: false,
                order: { ...state.order }
            }
        }
        default:
            return state;
    }
}