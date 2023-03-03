import { makeOrder } from "../../utils/react-burger-api";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const makeOrderRequest = (ingredientIds) => {
    return async function (dispatch) {
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