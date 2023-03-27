import { TIngredient } from '../../types';
import { 
    INGREDIENT_DETAIL_SET,
    SET_BROWSED_CATEGORY,
} from './actionTypes';

export interface IIngredientDetailSetAction {
    readonly type: typeof INGREDIENT_DETAIL_SET;
    readonly payload: TIngredient;
}

export interface ISetBrowsedCategoryAction {
    readonly type: typeof SET_BROWSED_CATEGORY;
    readonly payload: string;
}

export type TIngredientDetailActions = IIngredientDetailSetAction | ISetBrowsedCategoryAction;
