import { makeOrder } from "../../utils/react-burger-api";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const makeOrderRequest = (ingredientIds) => {
    return async function (dispatch) {
        try {
            dispatch({ type: MAKE_ORDER_REQUEST })
            const fetchData = await makeOrder(ingredientIds);

            if (fetchData?.success) {
                dispatch({
                    type: MAKE_ORDER_SUCCESS,
                    payload: { number: fetchData.order.number }
                })
                return true
            } else {
                dispatch({ type: MAKE_ORDER_FAILED })
                throw new Error('')
            }
        }
        catch{
            dispatch({ type: MAKE_ORDER_FAILED })
            throw new Error('make order failed')
        }
    }
}