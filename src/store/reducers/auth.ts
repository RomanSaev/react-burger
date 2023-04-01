import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    USER_SET,
    USER_PATCH_REQUEST,
    USER_PATCH_SUCCESS,
    USER_PATCH_FAILED,
    USER_UPDATE,
    AUTH_CHECKED,
} from "../actions/actionTypes";
import { TAuthActions } from "../actions/auth";

export type TAuthState = {
    registerRequest: boolean;
    registerFailed: boolean;

    loginRequest: boolean;
    loginFailed: boolean;

    logoutRequest: boolean;
    logoutFailed: boolean; 

    getUserRequest: boolean;
    getUserFailed: boolean;

    patchUserRequest: boolean;
    patchUserSuccess: boolean;
    patchUserFailed: boolean;

    authChecked: boolean;

    user: {
        name: string;
        email: string;
        password: string;
        isLogged: boolean;
    },
}

export const initialState: TAuthState = {
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

    authChecked: false,

    user: {
        name: '',
        email: '',
        password: '',
        isLogged: false
    },
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
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
                authChecked: true,
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
                authChecked: true,
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
                    ...initialState.user,
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

        case AUTH_CHECKED: {
            return {
                ...state,
                user: {
                    ...state.user
                },
                authChecked: true,
            }
        }

        default:
            return state;
    }
}