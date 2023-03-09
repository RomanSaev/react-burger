import { RootState } from "../types/store";

export const ingredientsSelector = (state: RootState) => state.ingredients;

export const burgerConstructorSelector = (state: RootState) => state.burgerConstructor;

export const ingredientDetailSelector = (state: RootState) => state.ingredientDetail;

export const orderSelector = (state: RootState) => state.order;

export const resetPasswordSelector = (state: RootState) => state.resetPassword;

export const authSelector = (state: RootState) => state.auth;