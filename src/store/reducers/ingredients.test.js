import {ingredientsReducer} from './ingredients'
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions/actionTypes"

describe('ingredients reducer', () => {
    const testIngredients = [
        {
            _id: '4234234324',
            name: 'Star Bun',
            type: 'bun',
            proteins: 1245,
            fat: 1241,
            carbohydrates: 21,
            calories: 15315,
            price: 1500,
            image: 'https://someurl/img.jpg',
            image_mobile: 'https://someurl/img-mob.jpg',
            image_large: 'https://someurl/img-large.jpg',
            __v: 15,
        },
        {
            _id: '1231233123',
            name: 'Sunny sauce',
            type: 'sauce',
            proteins: 13,
            fat: 1555,
            carbohydrates: 14,
            calories: 49,
            price: 300,
            image: 'https://someurl/img.jpg',
            image_mobile: 'https://someurl/img-mob.jpg',
            image_large: 'https://someurl/img-large.jpg',
            __v: 15,
        }
    ]

    const initialState = {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
    }

    it('should return initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST,
        })).toEqual({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            payload: testIngredients,
        })).toEqual({
            ingredients: testIngredients,
            ingredientsRequest: false,
            ingredientsFailed: false
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(initialState, {
            type: GET_INGREDIENTS_FAILED,
        })).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: true
        })
    })
})