import { TResetPasswordForm } from "../../types";
import { AppDispatch, AppThunk } from "../../types/store";
import { resetPasswordRequest, forgotPasswordRequest } from "../../utils/react-burger-api";
import { 
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
 } from "./actionTypes";

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions = IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;

export const fetchForgotPassword: AppThunk = (email: string) => {
    return async function (dispatch: AppDispatch ) {
        try {
            dispatch({ type: FORGOT_PASSWORD_REQUEST })
            await forgotPasswordRequest(email)

            dispatch({ type: FORGOT_PASSWORD_SUCCESS })
        }
        catch(e) {
            dispatch({ type: FORGOT_PASSWORD_FAILED })

            //важно для корректной обработки в компоненте (не делать переход на след. шаг формы)
            throw 'forgot password error'
        }
    }
}

export const fetchResetPassword: AppThunk = (data: TResetPasswordForm) => {
    return async (dispatch: AppDispatch ) => {

        try {
            dispatch({ type: RESET_PASSWORD_REQUEST});
            await resetPasswordRequest(data)

            dispatch({ type: RESET_PASSWORD_SUCCESS });
        }
        catch(e) {
            dispatch({ type: RESET_PASSWORD_FAILED });

            //важно для корректной обработки в компоненте
            throw 'reset password error'
        }
    }
}