import { viewOrderReducer } from "./view-order";
import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/actionTypes"
import { initialState } from "./view-order";

describe('view-order reducer', () => {
    const testOrder = {
        ingredients: ['abc123','abcd123e'],
        _id: 'sadsadasdsadas',
        name: 'Super Custom Burger',
        status: 'pending',
        number: 123456,
        createdAt: 'testdate',
        updatedAt: 'testdate',
    }

    it('should handle GET_ORDER_REQUEST', () => {
        expect(viewOrderReducer(initialState, {
            type: GET_ORDER_REQUEST
        })).toEqual({
            order: null,
            getOrderRequest: true,
            getOrderFailed: false,
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(viewOrderReducer(initialState, {
            type: GET_ORDER_SUCCESS,
            payload: testOrder,
        })).toEqual({
            order: testOrder,
            getOrderRequest: false,
            getOrderFailed: false,
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(viewOrderReducer(initialState, {
            type: GET_ORDER_FAILED,
        })).toEqual({
            order: null,
            getOrderRequest: false,
            getOrderFailed: true,
        })
    })
})