import { INGREDIENT_DETAIL_SET, SET_BROWSED_CATEGORY } from "../actions/actionTypes"
import { ingredientDetailReducer } from "./ingredient-detail"

describe('ingredient-detail reducer', () => {

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

    it('should return initial state', () => {
        expect(ingredientDetailReducer(undefined, {})).toEqual({
            selectedIngredient: null,
            browsedCategory: 'bun',
        })
    })

    it('should handle SET_BROWSED_CATEGORY', () => {
        expect(ingredientDetailReducer({
            selectedIngredient: null,
            browsedCategory: 'bun',
        }, {
            type: SET_BROWSED_CATEGORY,
            payload: 'sauce'
        })).toEqual({
            selectedIngredient: null,
            browsedCategory: 'sauce'
        })

        expect(ingredientDetailReducer({
            selectedIngredient: null,
            browsedCategory: 'sauce'
        }, {
            type: SET_BROWSED_CATEGORY,
            payload: 'main'
        })).toEqual({
            selectedIngredient: null,
            browsedCategory: 'main'
        })
    
    })

    it('should handle INGREDIENT_DETAIL_SET', () => {
        expect(ingredientDetailReducer({
            selectedIngredient: null,
            browsedCategory: 'bun'
        }, {
            type: INGREDIENT_DETAIL_SET,
            payload: testIngredients[0]
        })).toEqual({
            selectedIngredient: testIngredients[0],
            browsedCategory: 'bun'
        })

        expect(ingredientDetailReducer({
            selectedIngredient: testIngredients[0],
            browsedCategory: 'bun'
        }, {
            type: INGREDIENT_DETAIL_SET,
            payload: testIngredients[1]
        })).toEqual({
            selectedIngredient: testIngredients[1],
            browsedCategory: 'bun'
        })
    })
})