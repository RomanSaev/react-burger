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