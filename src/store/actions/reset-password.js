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
            const fetchData = await forgotPasswordRequest(email)

            if (fetchData?.success) {
                dispatch({ type: FORGOT_PASSWORD_SUCCESS })
                return true;
            } else {
                dispatch({ type: FORGOT_PASSWORD_FAILED })
                throw new Error('')
            }
        }
        catch(e) {
            dispatch({ type: FORGOT_PASSWORD_FAILED })
            throw new Error('forgot password fetch error')
        }
    }
}

export const fetchResetPassword = (data) => {
    return async (dispatch) => {

        try {
            dispatch({ type: RESET_PASSWORD_REQUEST});
            const fetchData = await resetPasswordRequest(data)

            if (fetchData?.success) {
                dispatch({ type: RESET_PASSWORD_SUCCESS });
                return true;
            } else {
                dispatch({ type: RESET_PASSWORD_FAILED });
                throw new Error('');
            }
        }
        catch(e) {
            dispatch({ type: RESET_PASSWORD_FAILED });
            throw new Error('reset password fetch error');
        }

    }
}