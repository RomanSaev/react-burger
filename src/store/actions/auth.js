import { deleteCookie, getCookie, saveTokens } from "../../utils/functions-helper";
import { getUserRequest, loginRequest, logoutRequest, refreshTokenRequest, registerRequest, updateUserRequest } from "../../utils/react-burger-api";
// import { USER_SET } from "./user";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

export const USER_SET = 'USER_SET'

export const USER_PATCH_REQUEST = 'USER_PATCH_REQUEST'
export const USER_PATCH_SUCCESS = 'USER_PATCH_SUCCESS'
export const USER_PATCH_FAILED = 'USER_PATCH_FAILED'

export const USER_UPDATE = 'USER_UPDATE'

export const AUTH_CHECKED = 'AUTH_CHECKED'

export const fetchRegister = (data) => {
    return async dispatch => {
        try {
            let authToken;

            dispatch({ type: REGISTER_REQUEST });
            const fetchData = await registerRequest(data)

            if (fetchData?.success) {
                dispatch({ type: REGISTER_SUCCESS });

                authToken = fetchData.accessToken.split('Bearer ')[1];
                
                if (authToken) {
                    // Сохраняем токен в куку token
                    // setCookie('accessToken', authToken);

                    saveTokens(authToken, fetchData.refreshToken)
                }

                // dispatch({ type: USER_SET, payload: fetchData.user})

                return true;
            } else {
                dispatch({ type: REGISTER_FAILED });
                throw new Error('');
            }
        }
        catch {
            dispatch({ type: REGISTER_FAILED });
            throw new Error('register fetch error');
        }
    }
}

export const fetchLogin = (data) => {
    return async dispatch => {
        try {
            let authToken;

            dispatch({ type: LOGIN_REQUEST });
            const fetchData = await loginRequest(data)

            if (fetchData?.success) {
                dispatch({ type: LOGIN_SUCCESS });

                authToken = fetchData.accessToken.split('Bearer ')[1];
                if (authToken) {
                    saveTokens(authToken, fetchData.refreshToken)
                }
                
                dispatch({
                    type: USER_SET,
                    payload: fetchData.user,
                })

                return true;
            } else {
                dispatch({ type: LOGIN_FAILED });
                throw new Error('');
            }
        }
        catch {
            dispatch({ type: LOGIN_FAILED });
            throw new Error('login fetch error');
        }
    }
}

export const fetchLogout = () => {
    return async dispatch => {
        try {
            dispatch({ type: LOGOUT_REQUEST });
            const fetchData = await logoutRequest()
            if (fetchData?.success) {
                dispatch({ type: LOGOUT_SUCCESS });

                deleteCookie('accessToken')
                localStorage.removeItem('refreshToken');
                
                return true;
            } else {
                dispatch({ type: LOGOUT_FAILED });
                throw new Error('');
            }
        }
        catch {
            dispatch({ type: LOGOUT_FAILED });
            throw new Error('logout fetch error');
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        try{
            dispatch({ type: GET_USER_REQUEST });

            const fetchData = await getUserRequest()
            if (fetchData?.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                });

                dispatch({
                    type: USER_SET,
                    payload: fetchData.user,
                })

                return true;
            } else {
                dispatch({ type: GET_USER_FAILED });
                throw new Error(fetchData.message || '');
            }
        }
        catch(err) {
            dispatch({
                type: GET_USER_FAILED,
            });
        }
    }
}

export const updateUser = (data) => {
    return async dispatch => {
        try{
            dispatch({ type: USER_PATCH_REQUEST });
            const fetchData = await updateUserRequest(data)

            if (fetchData?.success) {
                dispatch({
                    type: USER_PATCH_SUCCESS,
                    // payload: fetchData.user,
                });

                dispatch({
                    type: USER_UPDATE,
                    payload: fetchData.user,
                })

                return true;
            } else {
                dispatch({ type: USER_PATCH_FAILED });
                throw new Error('');
            }
        }
        catch(err) {
            dispatch({ type: USER_PATCH_FAILED });
            throw new Error('patch user error');
        }
    }
}

export const checkUserAuth = () => {
    return async dispatch => {
        if(getCookie('accessToken')) {
            dispatch(getUser()).finally(() => {
                dispatch({ type: AUTH_CHECKED })
            })
        } else {
            dispatch({ type: AUTH_CHECKED })
        }
    }
}
