import { resetPasswordReducer } from "./reset-password";
import { 
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS 
} from "../actions/actionTypes"

describe('reset-password reducer', () => {
    const initialState = {
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,

        resetPasswordRequest: false,
        resetPasswordFailed: false,
    }

    it('should return initial state', () => {
        expect(resetPasswordReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST
        })).toEqual({
            forgotPasswordRequest: true,
            forgotPasswordFailed: false,
    
            resetPasswordRequest: false,
            resetPasswordFailed: false, 
        })
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(initialState, {
            type: FORGOT_PASSWORD_SUCCESS
        })).toEqual(initialState)
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(initialState, {
            type: FORGOT_PASSWORD_FAILED
        })).toEqual({
            forgotPasswordRequest: false,
            forgotPasswordFailed: true,
    
            resetPasswordRequest: false,
            resetPasswordFailed: false, 
        })
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(resetPasswordReducer(initialState, {
            type: RESET_PASSWORD_REQUEST
        })).toEqual({
            forgotPasswordRequest: false,
            forgotPasswordFailed: false,
    
            resetPasswordRequest: true,
            resetPasswordFailed: false, 
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(resetPasswordReducer(initialState, {
            type: RESET_PASSWORD_SUCCESS
        })).toEqual(initialState)
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(resetPasswordReducer(initialState, {
            type: RESET_PASSWORD_FAILED
        })).toEqual({
            forgotPasswordRequest: false,
            forgotPasswordFailed: false,
    
            resetPasswordRequest: false,
            resetPasswordFailed: true, 
        })
    })
})