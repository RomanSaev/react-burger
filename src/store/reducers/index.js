import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetail: ingredientDetailReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
})