import { TOrderData } from "../../types";
import { AppDispatch, AppThunk } from "../../types/store";
import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./actionTypes";
import { getOrderRequest } from "../../utils/react-burger-api";

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    payload: TOrderData;
}

export type TViewOrderActions = IGetOrderRequestAction
    | IGetOrderFailedAction
    | IGetOrderSuccessAction;

export const getOrder: AppThunk = (orderNumber: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: GET_ORDER_REQUEST })

            const fetchData = await getOrderRequest(orderNumber);

            if (fetchData.orders.length) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: fetchData.orders[0],
                })
            } else {
                dispatch({ type: GET_ORDER_FAILED })
            }
            
        }
        catch {
            dispatch({ type: GET_ORDER_FAILED })
        }
    }
}