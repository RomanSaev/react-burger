import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, USER_PATCH_FAILED, USER_PATCH_REQUEST, USER_PATCH_SUCCESS, USER_SET, USER_UPDATE } from "../actions/auth";

const initialState = {
    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false, 

    getUserRequest: false,
    getUserFailed: false,

    patchUserRequest: false,
    patchUserSuccess: false,
    patchUserFailed: false,

    user: {
        name: '',
        email: '',
        password: '',
        isLogged: false
    },
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                user: { ...state.user },
                registerRequest: true,
                registerFailed: false,
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                user: { ...state.user },
                registerRequest: false,
                registerFailed: false,
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                user: { ...state.user },
                registerRequest: false,
                registerFailed: true,
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                user: { ...state.user },
                loginRequest: true,
                loginFailed: false,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: { ...state.user },
                loginRequest: false,
                loginFailed: false,
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                user: { ...state.user },
                loginRequest: false,
                loginFailed: true,
            }
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                user: { ...state.user },
                getUserRequest: true,
                getUserFailed: false,
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: { ...state.user },
                getUserRequest: false,
                getUserFailed: false,
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                user: { ...state.user },
                getUserRequest: false,
                getUserFailed: true,
            }
        }

        case USER_SET: {
            return {
                ...state,
                user: { 
                    ...state.user,
                    ...action.payload,
                    isLogged: true,
                },
            }
        }

        case USER_PATCH_REQUEST: {
            return {
                ...state,
                user: { ...state.user },
                patchUserRequest: true,
                patchUserSuccess: false,
                patchUserFailed: false,
            }
        }
        case USER_PATCH_SUCCESS: {
            return {
                ...state,
                user: { ...state.user },
                patchUserRequest: false,
                patchUserSuccess: true,
                patchUserFailed: false,
            }
        }
        case USER_PATCH_FAILED: {
            return {
                ...state,
                user: { ...state.user },
                patchUserRequest: false,
                patchUserSuccess: false,
                patchUserFailed: true,
            }
        }

        case USER_UPDATE: {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                    password: '',
                }
            }
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
                user: {
                    ...state.user
                },
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user
                },
                logoutRequest: false,
                logoutFailed: false,
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                user: {
                    ...state.user
                },
                logoutRequest: false,
                logoutFailed: true
            }
        }

        default:
            return state;
    }
}