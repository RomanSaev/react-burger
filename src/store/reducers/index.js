import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientDetailReducer } from './ingredient-detail';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
// import { forgotPasswordReducer } from './forgot-password';
import { resetPasswordReducer } from './reset-password';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetail: ingredientDetailReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    
    // forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    auth: authReducer,
})