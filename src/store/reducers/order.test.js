import { orderReducer } from "./order"
import { MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILED} from '../actions/actionTypes'
import { initialState } from "./order"

describe('order reducer', () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle MAKE_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: MAKE_ORDER_REQUEST,
        })).toEqual({
            order: null,
            orderRequest: true,
            orderFailed: false,
        })
    })

    it('should handle MAKE_ORDER_SUCCESS', () => {
        expect(orderReducer(initialState, {
            type: MAKE_ORDER_SUCCESS,
            payload: {
                number: 3424242
            }
        })).toEqual({
            order: {
                number: 3424242
            },
            orderRequest: false,
            orderFailed: false,
        })
    })

    it('should handle MAKE_ORDER_FAILED', () => {
        expect(orderReducer(initialState, {
            type: MAKE_ORDER_FAILED,
        })).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: true,
        })

        expect(orderReducer({
            order: {
                number: 3424242
            },
            orderRequest: false,
            orderFailed: false,
        }, {
            type: MAKE_ORDER_FAILED,
        })).toEqual({
            order: null,
            orderRequest: false,
            orderFailed: true,
        })
    })
})