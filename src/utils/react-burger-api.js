import {burgerApiUrl} from '../constants'

export function getIngredients() {
    return fetch(`${burgerApiUrl}/ingredients`)
        .then(response => response.json())
}

export function makeOrder(ingredientIds = []) {
    return fetch(`${burgerApiUrl}/orders`, {
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
    return fetch(`${burgerApiUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email
        })
    }).then(response => response.json())
}

export function resetPasswordRequest({ password, emailCode: token}) {
    debugger;
    return fetch(`${burgerApiUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password,
            token,
        })
    }).then(response => response.json())
}