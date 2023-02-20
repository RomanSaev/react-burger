import { BURGER_API_URL, ENDPOINT_INGREDIENTS, ENDPOINT_LOGIN, ENDPOINT_LOGOUT, ENDPOINT_MAKE_ORDER, ENDPOINT_PASSWORD_FORGOT, ENDPOINT_PASSWORD_RESET, ENDPOINT_REGISTER, ENDPOINT_TOKEN_REFRESH, ENDPOINT_USER } from '../constants'
import { getCookie, saveTokens } from './functions-helper';

const checkReponse = async (res) => {
    if (!res.ok) throw `Ошибка ${res.status}`
    return await res.json()
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    throw 'Ответ не success'
}

//обертка над fetch с проверками ответов сервера
const request = async (endpoint, options) => {
    const fetchData = await fetch(`${BURGER_API_URL}${endpoint}`, options)
    const response = await checkReponse(fetchData);
    return checkSuccess(response)
}

//получение списка ингредиентов
export async function getIngredients() {
    return await request(ENDPOINT_INGREDIENTS)
}

export const fetchWithRefresh = async (url, options) => {
    try {
        // throw new Error ('jwt expired') //test
        return await request(url, options);
    } catch (err) {
        if (err.message === "jwt expired") {
            let authToken;
            const refreshData = await refreshTokenRequest(); //обновляем токен

            authToken = refreshData.accessToken.split('Bearer ')[1];
            if (authToken) {
                saveTokens(authToken, refreshData.refreshToken)
            }
            options.headers['Authorization'] = refreshData.accessToken;

            return await request(url, options); //повторяем запрос
        } else {
            throw 'refresh token err'
        }
    }
  };

//создание заказа
export const makeOrder = async (ingredientIds) => {
    return await request(ENDPOINT_MAKE_ORDER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            ingredients: ingredientIds
        })
    })
}

//отправка запроса на получение письма по причине "Забыл пароль"
export const forgotPasswordRequest = async (email) => {
    return await request(ENDPOINT_PASSWORD_FORGOT, {
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
export const resetPasswordRequest = async ({ password, emailCode: token}) => {
    return await request(ENDPOINT_PASSWORD_RESET, {
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
export const registerRequest = async ({ email, password, name }) => {
    return await request(ENDPOINT_REGISTER, {
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
export const loginRequest = async ({ email, password }) => {
    return await request(ENDPOINT_LOGIN, {
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
    return await fetchWithRefresh(ENDPOINT_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
}

//запрос на изменение параметров пользователя
export const updateUserRequest = async (data) => {
    return await request(ENDPOINT_USER, {
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
export const refreshTokenRequest = async () => {
    return await request(ENDPOINT_TOKEN_REFRESH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}

//запрос на выход из профиля
export const logoutRequest = async () => {
    return await request(ENDPOINT_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
}