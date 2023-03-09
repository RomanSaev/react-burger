import { TIngredient } from "../../types";
import { INGREDIENT_DETAIL_SET, SET_BROWSED_CATEGORY } from "../actions/actionTypes";
import { TIngredientDetailActions } from "../actions/ingredient-detail";

export type TIngredientDetailState = {
    selectedIngredient: null | TIngredient;
    browsedCategory: string;
}

const initialState: TIngredientDetailState = {
    selectedIngredient: null,
    browsedCategory: 'bun', //текущая просматриваемая категория в BurgerIngredients (активный таб)
}

export const ingredientDetailReducer = (state = initialState, action: TIngredientDetailActions): TIngredientDetailState => {
    switch (action.type){
        case SET_BROWSED_CATEGORY: {
            return {...state, browsedCategory: action.payload}
        }
        case INGREDIENT_DETAIL_SET: {
            return {
                ...state,
                selectedIngredient: action.payload
            }
        }
        default:
            return state;
    }
}