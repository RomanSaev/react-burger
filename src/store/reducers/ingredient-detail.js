import { HIDE_INGREDIENT_DETAIL_MODAL, SET_BROWSED_CATEGORY, SHOW_INGREDIENT_DETAIL_MODAL } from "../actions/ingredient-detail";

const initialState = {
    isIngrDetailModalShowing: false,
    selectedIngredient: null,

    browsedCategory: 'bun', //текущая просматриваемая категория в BurgerIngredients (активный таб)
}

export const ingredientDetailReducer = (state = initialState, action) => {
    switch (action.type){
        case SHOW_INGREDIENT_DETAIL_MODAL: {
            return {...state, isIngrDetailModalShowing: true, selectedIngredient: action.payload}
        }
        case HIDE_INGREDIENT_DETAIL_MODAL: {
            return {...state, isIngrDetailModalShowing: false, selectedIngredient: null}
        }
        case SET_BROWSED_CATEGORY: {
            return {...state, browsedCategory: action.payload}
        }
        default:
            return state;
    }
}