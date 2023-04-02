import { BURGER_API_URL, ENDPOINT_INGREDIENTS, ENDPOINT_LOGIN, ENDPOINT_LOGOUT, ENDPOINT_MAKE_ORDER, ENDPOINT_ORDER, ENDPOINT_PASSWORD_FORGOT, ENDPOINT_PASSWORD_RESET, ENDPOINT_REGISTER, ENDPOINT_TOKEN_REFRESH, ENDPOINT_USER } from '../constants'
import { TIngredient, TLoginForm, TOrderData, TRegisterForm, TResetPasswordForm, TUserUpdateData } from '../types';
import { getCookie, saveTokens } from './functions-helper';

type TServerResponse<T> = {
    success: boolean;
} & T;

type TIngredientsResponse = TServerResponse<{
    data: TIngredient[]
}>

type TMakeOrderResponse = TServerResponse<{
    name: string;
    order: {
        number: number;
    }
}>

type TUserResponse = TServerResponse<{
    user: {
        email: string;
        name: string;
    }
}>

type TRegisterResponse = TServerResponse<{
    user: {
        email: string;
        name: string;
    }
    accessToken: string;
    refreshToken: string;
}>

type TLoginResponse = TServerResponse<{
    user: {
        email: string;
        name: string;
    }
    accessToken: string;
    refreshToken: string;
}>

type TForgotPasswordResponse = TServerResponse<{
    message: string
}>

type TResetPasswordResponse = TServerResponse<{
    message: string
}>

type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

type TLogoutResponse = TServerResponse<{
    message: string
}>

type TGetOrderResponse = TServerResponse<{
    orders: TOrderData[];
}>

type TErrorResponse = TServerResponse<{
    message: string
}>


const checkReponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) {
        if (res.status === 403) { 
            throw await res.json()
        }
        throw `Ошибка ${res.status}`
    }
    return await res.json()
};

const checkSuccess = <T>(res: any): T => { //не понял, как тут обойтись без any
    if (res && res.success) {
        return res;
    }
    throw 'Ответ не success'
}

//обертка над fetch с проверками ответов сервера
const request = async <T>(endpoint: RequestInfo, options?: RequestInit): Promise<T> => {
    const fetchData = await fetch(`${BURGER_API_URL}${endpoint}`, options)
    const response = await checkReponse<T>(fetchData);
    return checkSuccess<T>(response)
}

//получение списка ингредиентов
export async function getIngredients(): Promise<TIngredientsResponse> {
    return await request<TIngredientsResponse>(ENDPOINT_INGREDIENTS)
}

export const fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
    try {
        // throw new Error ('jwt expired') //test
        return await request<T>(url, options);
    } catch (err) {
        if ((err as TErrorResponse).message === "jwt expired") {
            let authToken;
            const refreshData = await refreshTokenRequest(); //обновляем токен

            authToken = refreshData.accessToken.split('Bearer ')[1];
            if (authToken) {
                saveTokens(authToken, refreshData.refreshToken)
            }

            if (options.headers) {
                (options.headers as { [key: string]: string }).authorization =
                  refreshData.accessToken;
            }

            return await request<T>(url, options); //повторяем запрос
        } else {
            throw 'refresh token err'
        }
    }
  };

//создание заказа
export const makeOrder = async (ingredientIds: string[]): Promise<TMakeOrderResponse> => {
    return await fetchWithRefresh<TMakeOrderResponse>(ENDPOINT_MAKE_ORDER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            ingredients: ingredientIds
        })
    })
}

//отправка запроса на получение письма по причине "Забыл пароль"
export const forgotPasswordRequest = async (email: string): Promise<TForgotPasswordResponse> => {
    return await request<TForgotPasswordResponse>(ENDPOINT_PASSWORD_FORGOT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    })
}


//отправка запроса на изменение забытого пароля
export const resetPasswordRequest = async ({ password, emailCode: token}: TResetPasswordForm): Promise<TResetPasswordResponse> => {
    return await request<TResetPasswordResponse>(ENDPOINT_PASSWORD_RESET, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password,
            token,
        })
    })
}


//отправка запроса на регистрацию
export const registerRequest = async ({ email, password, name }: TRegisterForm): Promise <TRegisterResponse> => {
    return await request<TRegisterResponse>(ENDPOINT_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email, 
            password, 
            name,
        })
    })
}

//отправка запроса на авторизацию
export const loginRequest = async ({ email, password }: TLoginForm): Promise<TLoginResponse> => {
    return await request<TLoginResponse>(ENDPOINT_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email, 
            password, 
        })
    })
}

//запрос получения пользователя
export const getUserRequest = async () => {
    return await fetchWithRefresh<TUserResponse>(ENDPOINT_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
}

//запрос на изменение параметров пользователя
export const updateUserRequest = async (data: TUserUpdateData): Promise<TUserResponse> => {
    return await request<TUserResponse>(ENDPOINT_USER, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            ...data
        })
    })
}

//запрос на обновление токена
export const refreshTokenRequest = async (): Promise<TRefreshResponse> => {
    return await request<TRefreshResponse>(ENDPOINT_TOKEN_REFRESH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

//метод для обновления токенов
export const refreshTokens = async(): Promise<void> => {
    const refreshData = await refreshTokenRequest();
    let authToken;
    authToken = refreshData.accessToken.split('Bearer ')[1];
    if (authToken) {
        saveTokens(authToken, refreshData.refreshToken)
    } else {
        throw 'refresh tokens error'
    }
}

//запрос на выход из профиля
export const logoutRequest = async (): Promise<TLogoutResponse> => {
    return await request<TLogoutResponse>(ENDPOINT_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

//запрос данных о заказе
export const getOrderRequest = async (orderNumber: number): Promise<TGetOrderResponse> => {
    return await request<TGetOrderResponse>(`${ENDPOINT_ORDER}/${orderNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}