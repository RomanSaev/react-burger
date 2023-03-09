import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore } from "../store";
import { TAuthActions } from "../store/actions/auth";
import { TBurgerConstructorActions } from "../store/actions/burger-constructor";
import { TIngredientDetailActions } from "../store/actions/ingredient-detail";
import { TIngredientsActions } from "../store/actions/ingredients";
import { TOrderActions } from "../store/actions/order";
import { TResetPasswordActions } from "../store/actions/reset-password";
import { rootReducer } from "../store/reducers";

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
//export type RootState =  ReturnType<typeof rootReducer>

// Типизация всех экшенов приложения
type TApplicationActions = TAuthActions 
    | TBurgerConstructorActions
    | TIngredientDetailActions
    | TIngredientsActions
    | TOrderActions
    | TResetPasswordActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, never, TApplicationActions>
>;
// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState, TApplicationActions>
// >;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   never,
//   TApplicationActions
// >


// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>
// export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = Dispatch<TApplicationActions>;
