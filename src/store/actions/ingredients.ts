import { TIngredient } from '../../types';
import { AppDispatch } from '../../types/store';
import { getIngredients } from '../../utils/react-burger-api'
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from './actionTypes';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;

export const fetchIngredients = () => {
    return async function (dispatch: AppDispatch ) {
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