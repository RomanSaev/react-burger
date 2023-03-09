import { TOrder } from "../../types";
import { AppDispatch, AppThunk } from "../../types/store";
import { makeOrder } from "../../utils/react-burger-api";
import {
    MAKE_ORDER_REQUEST,
    MAKE_ORDER_SUCCESS,
    MAKE_ORDER_FAILED,
 } from "./actionTypes";

export interface IMakeOrderRequestAction {
    readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderSuccessAction {
    readonly type: typeof MAKE_ORDER_SUCCESS;
    readonly payload: TOrder;
}

export interface IMakeOrderFailedAction {
    readonly type: typeof MAKE_ORDER_FAILED;
}

export type TOrderActions = IMakeOrderRequestAction
    | IMakeOrderSuccessAction
    | IMakeOrderFailedAction;

export const makeOrderRequest: AppThunk = (ingredientIds: string[]) => {
    return async function (dispatch: AppDispatch ) {
        try {
            dispatch({ type: MAKE_ORDER_REQUEST })
            const fetchData = await makeOrder(ingredientIds);

            dispatch({
                type: MAKE_ORDER_SUCCESS,
                payload: { number: fetchData.order.number }
            })
        }
        catch {
            dispatch({ type: MAKE_ORDER_FAILED })
            
            //важно для корректной обработки неуспешного заказа в компоненте (не открывать попап)
            throw new Error('make order error')
        }
    }
}