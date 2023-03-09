import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient, TIngredient, TIngredientMoveData } from '../../types';
import { 
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    MOVE_CONSTRUCTOR_ITEM,
    RESET_CONSTRUCTOR_ITEMS,
} from './actionTypes';

export interface IAddConstructorItemAction {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly payload: TConstructorIngredient;
}

export interface IRemoveConstructorItemAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_ITEM;
    readonly payload: TConstructorIngredient;
}

export interface IMoveConstructorItemAction {
    readonly type: typeof MOVE_CONSTRUCTOR_ITEM;
    readonly payload: TIngredientMoveData;
}

export interface IResetConstructorItemsAction {
    readonly type: typeof RESET_CONSTRUCTOR_ITEMS;
}

export type TBurgerConstructorActions = IAddConstructorItemAction
    | IRemoveConstructorItemAction
    | IMoveConstructorItemAction
    | IResetConstructorItemsAction;

export const addToConstructor = (ingredient: TIngredient): IAddConstructorItemAction => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        payload: {
            ...ingredient,
            uuid: uuidv4(),
        }
    }
}