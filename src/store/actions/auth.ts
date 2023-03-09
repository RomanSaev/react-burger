import { TLoginForm, TRegisterForm, TUser, TUserUpdateData } from "../../types";
import { AppDispatch, AppThunk } from "../../types/store";
import { deleteCookie, getCookie, saveTokens } from "../../utils/functions-helper";
import { getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest } from "../../utils/react-burger-api";
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
} from "./actionTypes";

// Типизация экшенов
export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
}
export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
}
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IUserSetAction {
    readonly type: typeof USER_SET;
    readonly payload: TUser;
}

export interface IUserPatchRequestAction {
    readonly type: typeof USER_PATCH_REQUEST;
}
export interface IUserPatchSuccessAction {
    readonly type: typeof USER_PATCH_SUCCESS;
}
export interface IUserPatchFailedAction {
    readonly type: typeof USER_PATCH_FAILED;
}

export interface IUserUpdateAction {
    readonly type: typeof USER_UPDATE;
    readonly payload: TUser;
}

export interface IAuthCheckedAction {
    readonly type: typeof AUTH_CHECKED;
}

// Объединяем в Union
export type TAuthActions = IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUserSetAction
    | IUserPatchRequestAction
    | IUserPatchSuccessAction
    | IUserPatchFailedAction
    | IUserUpdateAction
    | IAuthCheckedAction;


export const fetchRegister: AppThunk = (data: TRegisterForm) => {
    return async (dispatch: AppDispatch) => {
        try {
            let authToken;

            dispatch({ type: REGISTER_REQUEST });
            const fetchData = await registerRequest(data)

            dispatch({ type: REGISTER_SUCCESS });

            authToken = fetchData.accessToken.split('Bearer ')[1];
            if (authToken) {
                saveTokens(authToken, fetchData.refreshToken)
            }

            dispatch({
                type: USER_SET,
                payload: fetchData.user,
            })
        }
        catch (err) {
            dispatch({ type: REGISTER_FAILED });
        }
    }
}

export const fetchLogin: AppThunk = (data: TLoginForm) => {
    return async (dispatch: AppDispatch ) => {
        try {
            let authToken;

            dispatch({ type: LOGIN_REQUEST });
            const fetchData = await loginRequest(data)

            dispatch({ type: LOGIN_SUCCESS });

            authToken = fetchData.accessToken.split('Bearer ')[1];
            if (authToken) {
                saveTokens(authToken, fetchData.refreshToken)
            }
            
            dispatch({
                type: USER_SET,
                payload: fetchData.user,
            })

        }
        catch (err) {
            dispatch({ type: LOGIN_FAILED });
        }
    }
}

export const fetchLogout: AppThunk = () => {
    return async (dispatch: AppDispatch ) => {
        try {
            dispatch({ type: LOGOUT_REQUEST });
            await logoutRequest()

            dispatch({ type: LOGOUT_SUCCESS });
            deleteCookie('accessToken')
            localStorage.removeItem('refreshToken');
        }
        catch {
            dispatch({ type: LOGOUT_FAILED });
            throw 'logout fetch error';
        }
    }
}

export const getUser: AppThunk = () => {
    return async (dispatch: AppDispatch ) => {
        try{
            dispatch({ type: GET_USER_REQUEST });

            const fetchData = await getUserRequest()

            dispatch({ type: GET_USER_SUCCESS });

            dispatch({
                type: USER_SET,
                payload: fetchData.user,
            })
        }
        catch(err) {
            dispatch({ type: GET_USER_FAILED });
        }
    }
}

export const updateUser: AppThunk = (data: TUserUpdateData) => {
    return async (dispatch: AppDispatch ) => {
        try{
            dispatch({ type: USER_PATCH_REQUEST });
            const fetchData = await updateUserRequest(data)

            dispatch({ type: USER_PATCH_SUCCESS });

            dispatch({
                type: USER_UPDATE,
                payload: fetchData.user,
            })
        }
        catch(err) {
            dispatch({ type: USER_PATCH_FAILED });

            //важно
            throw 'patch user err';
        }
    }
}

export const checkUserAuth: AppThunk = () => {
    return async (dispatch: AppDispatch ) => {
        if(getCookie('accessToken')) {
            (dispatch(getUser()) as any).finally(() => {
                dispatch({ type: AUTH_CHECKED })
            })
        } else {
            dispatch({ type: AUTH_CHECKED })
        }
    }
}
