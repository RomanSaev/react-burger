import { getIngredients } from '../../utils/react-burger-api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const fetchIngredients = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: GET_INGREDIENTS_REQUEST})
            const fetchData = await getIngredients();

            if (fetchData?.success && fetchData.data.length > 0) {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: fetchData.data})
            } else {
                dispatch({ type: GET_INGREDIENTS_FAILED});
            }
        }
        catch {
            dispatch({ type: GET_INGREDIENTS_FAILED});
        }
    }
}