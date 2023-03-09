import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { resetPasswordReducer } from './reset-password';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetail: ingredientDetailReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    resetPassword: resetPasswordReducer,
    auth: authReducer,
})