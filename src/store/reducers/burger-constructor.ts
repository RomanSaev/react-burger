import { TConstructorIngredient } from "../../types";
import { ADD_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, RESET_CONSTRUCTOR_ITEMS } from "../actions/actionTypes";
import { TBurgerConstructorActions } from "../actions/burger-constructor";

export type TBurgerConstructorState = {
    bun: null | TConstructorIngredient;
    fillingIngredients: TConstructorIngredient[];
}

export const initialState: TBurgerConstructorState = {
    bun: null,
    fillingIngredients: [],
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {
            const ingredient = { ...action.payload };
            if (ingredient.type === 'bun') {
                return { ...state, bun: ingredient}
            }
            return { 
                ...state,
                fillingIngredients: [ ...state.fillingIngredients, ingredient ],
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            const ingredient = { ...action.payload };

            const newFillingIngredients = state.fillingIngredients.filter( item => {
                return item.uuid !== ingredient.uuid
            })

            return {
                ...state,
                fillingIngredients: newFillingIngredients,
            }
        }
        case MOVE_CONSTRUCTOR_ITEM: {
            const prevFillingIngredients = [ ...state.fillingIngredients ];

            const sortedFillingIngredients = [ ... prevFillingIngredients ];
            const indexFrom = action.payload.from;
            const indexTo = action.payload.to;

            //сортируем массив с переносом перетаскиваемого элемента в списке
            sortedFillingIngredients.splice(indexFrom, 1)
            sortedFillingIngredients.splice(indexTo, 0, prevFillingIngredients[indexFrom])

            return {
                ...state,
                fillingIngredients: sortedFillingIngredients,
            }
        }

        case RESET_CONSTRUCTOR_ITEMS: {
            return {
                ...state,
                bun: null,
                fillingIngredients: [ ...initialState.fillingIngredients ],
            }
        }

        default:
            return state;
    }
}