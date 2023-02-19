import { BURGER_API_URL } from '../constants'
import { getCookie, saveTokens } from './functions-helper';

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        // throw new Error ('jwt expired')
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            let authToken;
            const refreshData = await refreshTokenRequest(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }

            authToken = refreshData.accessToken.split('Bearer ')[1];
            if (authToken) {
                saveTokens(authToken, refreshData.refreshToken)
            }
            options.headers['Authorization'] = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос

            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
  };

export function getIngredients() {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkReponse)
}

export function makeOrder(ingredientIds = []) {
    return fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            ingredients: ingredientIds
        })
    }).then(response => response.json())
}

export function forgotPasswordRequest(email) {
    return fetch(`${BURGER_API_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    }).then(checkReponse)
}

export function resetPasswordRequest({ password, emailCode: token}) {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password,
            token,
        })
    }).then(checkReponse)
}

export function registerRequest({ email, password, name }) {
    return fetch(`${BURGER_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email, 
            password, 
            name,
        })
    }).then(checkReponse)
}

export function loginRequest({ email, password }) {
    return fetch(`${BURGER_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email, 
            password, 
        })
    }).then(checkReponse)
}

export function getUserRequest() {
    return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
}

export function updateUserRequest(data) {
    return fetch(`${BURGER_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            ...data
        })
    }).then(checkReponse);
}

export function refreshTokenRequest() {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    }).then(checkReponse);
}

export function logoutRequest() {
    return fetch(`${BURGER_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    }).then(response => response.json())
}