import { getIngredients } from '../../utils/react-burger-api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const fetchIngredients = () => {
    return async function (dispatch) {
        try {
            dispatch({ type: GET_INGREDIENTS_REQUEST})
            const fetchData = await getIngredients();

            dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: fetchData.data})
        }
        catch {
            dispatch({ type: GET_INGREDIENTS_FAILED});
        }
    }
}