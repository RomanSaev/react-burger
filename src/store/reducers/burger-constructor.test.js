import { burgerConstructorReducer } from './burger-constructor'
import { ADD_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM, RESET_CONSTRUCTOR_ITEMS } from "../actions/actionTypes";
import { initialState } from './burger-constructor'

describe('burger-constructor reducer', () => {
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
            uuid: 'sdda224'
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
            uuid: 's44442'
        },
        {
            _id: '346666666',
            name: 'Mars meat',
            type: 'main',
            proteins: 1333,
            fat: 155533,
            carbohydrates: 1433,
            calories: 4933,
            price: 30033,
            image: 'https://someurl/img.jpg',
            image_mobile: 'https://someurl/img-mob.jpg',
            image_large: 'https://someurl/img-large.jpg',
            __v: 15,
            uuid: 'arrrrbbbgg'
        }
    ]

    it('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_CONSTRUCTOR_ITEM', () => {
        expect(burgerConstructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_ITEM,
            payload: testIngredients[0], //bun
        })).toEqual({
            bun: testIngredients[0],
            fillingIngredients: [],
        })

        expect(burgerConstructorReducer(initialState, {
            type: ADD_CONSTRUCTOR_ITEM,
            payload: testIngredients[1], //filling
        })).toEqual({
            bun: null,
            fillingIngredients: [testIngredients[1]],
        })

        expect(burgerConstructorReducer({
            bun: testIngredients[0],
            fillingIngredients: []
        }, {
            type: ADD_CONSTRUCTOR_ITEM,
            payload: testIngredients[1], //filling
        })).toEqual({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[1]],
        })

        expect(burgerConstructorReducer({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[1]]
        }, {
            type: ADD_CONSTRUCTOR_ITEM,
            payload: testIngredients[2], //filling
        })).toEqual({
            bun: testIngredients[0],
            fillingIngredients: [
                testIngredients[1],
                testIngredients[2]
            ],
        })
    })

    it('should handle REMOVE_CONSTRUCTOR_ITEM', () => {
        expect(burgerConstructorReducer({
            bun: null,
            fillingIngredients: [testIngredients[1]],
        }, {
            type: REMOVE_CONSTRUCTOR_ITEM,
            payload: testIngredients[1],
        })).toEqual({
            bun: null,
            fillingIngredients: [],
        })

        expect(burgerConstructorReducer({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[1], testIngredients[2]],
        }, {
            type: REMOVE_CONSTRUCTOR_ITEM,
            payload: testIngredients[2],
        })).toEqual({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[1]],
        })
    })

    it('should handle MOVE_CONSTRUCTOR_ITEM', () => {
        expect(burgerConstructorReducer({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[1], testIngredients[2]],
        }, {
            type: MOVE_CONSTRUCTOR_ITEM,
            payload: {
                from: 1,
                to: 0,
            },
        })).toEqual({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[2], testIngredients[1]],
        })
    })

    it('should handle RESET_CONSTRUCTOR_ITEMS', () => {
        expect(burgerConstructorReducer({
            bun: testIngredients[0],
            fillingIngredients: [testIngredients[1], testIngredients[2]],
        }, {
            type: RESET_CONSTRUCTOR_ITEMS,
        })).toEqual(initialState)
    })
})