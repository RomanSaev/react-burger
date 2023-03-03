import { INGREDIENT_DETAIL_SET, SET_BROWSED_CATEGORY } from "../actions/ingredient-detail";

const initialState = {
    selectedIngredient: null,
    browsedCategory: 'bun', //текущая просматриваемая категория в BurgerIngredients (активный таб)
}

export const ingredientDetailReducer = (state = initialState, action) => {
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