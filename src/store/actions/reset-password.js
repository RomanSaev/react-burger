import { resetPasswordRequest, forgotPasswordRequest } from "../../utils/react-burger-api";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const fetchForgotPassword = (email) => {
    return async function (dispatch) {
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

export const fetchResetPassword = (data) => {
    return async (dispatch) => {

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