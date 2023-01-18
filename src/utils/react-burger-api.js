import {ingredientsApiUrl} from '../constants'

export function getIngredients() {
    return fetch(ingredientsApiUrl)
        .then(response => response.json())
}
 