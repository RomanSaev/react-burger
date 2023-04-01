import { authReducer } from "./auth";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, USER_SET, USER_PATCH_REQUEST, USER_PATCH_SUCCESS, USER_PATCH_FAILED, USER_UPDATE, AUTH_CHECKED } from "../actions/actionTypes";
import { initialState } from "./auth";

describe('auth reducer', () => {
    const testUser = {
        name: 'Margo',
        email: 'margo123123123@mail.ru',
        password: 'test'
    }

    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REGISTER_REQUEST', () => {
        expect(authReducer(initialState, {
            type: REGISTER_REQUEST
        })).toEqual({
            ...initialState,
            registerRequest: true,
            registerFailed: false,
        })
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: REGISTER_SUCCESS
        })).toEqual({
            ...initialState,
            authChecked: true,
            registerRequest: false,
            registerFailed: false,
        })
    })

    it('should handle REGISTER_FAILED', () => {
        expect(authReducer(initialState, {
            type: REGISTER_FAILED
        })).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: true,
        })
    })


    it('should handle LOGIN_REQUEST', () => {
        expect(authReducer(initialState, {
            type: LOGIN_REQUEST
        })).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false,
        })
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: LOGIN_SUCCESS
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: false,
            authChecked: true,
        })
    })

    it('should handle LOGIN_FAILED', () => {
        expect(authReducer(initialState, {
            type: LOGIN_FAILED
        })).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true,
        })
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(authReducer(initialState, {
            type: GET_USER_REQUEST
        })).toEqual({
            ...initialState,
            getUserRequest: true,
            getUserFailed: false,
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: GET_USER_SUCCESS
        })).toEqual({
            ...initialState,
            getUserRequest: false,
            getUserFailed: false,
        })
    })

    it('should handle GET_USER_FAILED', () => {
        expect(authReducer(initialState, {
            type: GET_USER_FAILED
        })).toEqual({
            ...initialState,
            getUserRequest: false,
            getUserFailed: true,
        })
    })

    it('should handle USER_SET', () => {
        expect(authReducer(initialState, {
            type: USER_SET,
            payload: testUser,
        })).toEqual({
            ...initialState,
            user: {
                ...testUser,
                isLogged: true,
            }
        })
    })

    it('should handle USER_PATCH_REQUEST', () => {
        expect(authReducer(initialState, {
            type: USER_PATCH_REQUEST
        })).toEqual({
            ...initialState,
            patchUserRequest: true,
            patchUserSuccess: false,
            patchUserFailed: false,
        })
    })

    it('should handle USER_PATCH_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: USER_PATCH_SUCCESS
        })).toEqual({
            ...initialState,
            patchUserRequest: false,
            patchUserSuccess: true,
            patchUserFailed: false,
        })
    })

    it('should handle USER_PATCH_FAILED', () => {
        expect(authReducer(initialState, {
            type: USER_PATCH_FAILED
        })).toEqual({
            ...initialState,
            patchUserRequest: false,
            patchUserSuccess: false,
            patchUserFailed: true,
        })
    })

    it('should handle USER_UPDATE', () => {
        expect(authReducer({
            ...initialState,
            user: {
                ...testUser,
                name: 'test',
                isLogged: true,
            }
        }, {
            type: USER_UPDATE,
            payload: testUser,
        })).toEqual({
            ...initialState,
            user: {
                ...testUser,
                password: '',
                isLogged: true,
            }
        })
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(authReducer(initialState, {
            type: LOGOUT_REQUEST
        })).toEqual({
            ...initialState,
            logoutRequest: true,
            logoutFailed: false
        })
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: LOGOUT_SUCCESS
        })).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: false,
        })
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(authReducer(initialState, {
            type: LOGOUT_FAILED
        })).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: true
        })
    })

    it('should handle AUTH_CHECKED', () => {
        expect(authReducer(initialState, {
            type: AUTH_CHECKED
        })).toEqual({
            ...initialState,
            authChecked: true,
        })
    })
})