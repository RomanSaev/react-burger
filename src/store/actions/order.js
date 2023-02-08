import { makeOrder } from "../../utils/react-burger-api";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export const SHOW_ORDER_DETAIL_MODAL = 'SHOW_ORDER_DETAIL_MODAL';
export const HIDE_ORDER_DETAIL_MODAL = 'HIDE_ORDER_DETAIL_MODAL';

export const makeOrderRequest = (selectedIngredients) => {
    return async function (dispatch) {
        const ingredientIds = selectedIngredients.map(el => el._id);
        try {
            dispatch({ type: MAKE_ORDER_REQUEST })
            const fetchData = await makeOrder(ingredientIds);
            if (fetchData?.success) {
                dispatch({
                    type: MAKE_ORDER_SUCCESS,
                    payload: { number: fetchData.order.number }
                })
                dispatch({ type: SHOW_ORDER_DETAIL_MODAL })
            } else {
                dispatch({ type: MAKE_ORDER_FAILED })
            }
        }
        catch{
            dispatch({ type: MAKE_ORDER_FAILED })
        }
    }
}