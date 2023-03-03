import { v4 as uuidv4 } from 'uuid';

export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
export const REMOVE_CONSTRUCTOR_ITEM = 'REMOVE_CONSTRUCTOR_ITEM';
export const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM';
export const RESET_CONSTRUCTOR_ITEMS = 'RESET_CONSTRUCTOR_ITEMS';

export const addToConstructor = (ingredient) => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        payload: {
            ...ingredient,
            uuid: uuidv4(),
        }
    }
}