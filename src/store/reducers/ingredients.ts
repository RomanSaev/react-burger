import { TIngredient } from "../../types"
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions/actionTypes"
import { TIngredientsActions } from "../actions/ingredients"

export type TIngredientsState = {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

export const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {...state, ingredientsRequest: true, ingredientsFailed: false}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredients: action.payload, ingredientsRequest: false}
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state, 
                ingredients: [], 
                ingredientsRequest: false, 
                ingredientsFailed: true,
            }
        }
        default:
            return state;
    }
}