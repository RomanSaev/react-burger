import { HIDE_INGREDIENT_DETAIL_MODAL, SHOW_INGREDIENT_DETAIL_MODAL } from "../actions/ingredient-detail";

const initialState = {
    isIngrDetailModalShowing: false,
    selectedIngredient: null,
}

export const ingredientDetailReducer = (state = initialState, action) => {
    switch (action.type){
        case SHOW_INGREDIENT_DETAIL_MODAL: {
            return {...state, isIngrDetailModalShowing: true, selectedIngredient: action.payload}
        }
        case HIDE_INGREDIENT_DETAIL_MODAL: {
            return {...state, isIngrDetailModalShowing: false, selectedIngredient: null}
        }
        default:
            return state;
    }
}