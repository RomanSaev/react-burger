import { resetPasswordRequest } from "../../utils/react-burger-api";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const fetchResetPassword = (data) => {
    return async (dispatch) => {

        debugger;
        try {
            dispatch({ type: RESET_PASSWORD_REQUEST});
            const fetchData = await resetPasswordRequest(data)

            // TEST
            const test = new Promise((resolve, reject) => {
                setTimeout(() => { 
                    resolve();
                }, 3000)
            })
            await test;

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