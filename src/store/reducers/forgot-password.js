import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../actions/forgot-password"

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type){
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state, 
                forgotPasswordRequest: false
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state, 
                forgotPasswordRequest: false, 
                forgotPasswordFailed: true,
            }
        }
        default:
            return state;
    }
}