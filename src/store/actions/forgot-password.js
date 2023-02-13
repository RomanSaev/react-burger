import { forgotPasswordRequest } from "../../utils/react-burger-api";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const fetchForgotPassword = (email) => {
    return async function (dispatch) {
        try {
            dispatch({ type: FORGOT_PASSWORD_REQUEST })
            const fetchData = await forgotPasswordRequest(email)


            // TEST
            const test = new Promise((resolve, reject) => {
                setTimeout(() => { 
                    resolve();
                }, 3000)
            })
            await test;


            if (fetchData?.success) {
                dispatch({ type: FORGOT_PASSWORD_SUCCESS })

                //test
                // throw new Error('')

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