import { ordersHistoryReducer } from "./orders-history";
import { ORDERS_HISTORY_CONNECTION_CLOSED, ORDERS_HISTORY_CONNECTION_ERROR, ORDERS_HISTORY_CONNECTION_SUCCESS, ORDERS_HISTORY_GET_MESSAGE } from "../actions/actionTypes";

describe('orders-history reducer', () => {
    const testOrdersData = {
        orders: [
            {
                ingredients: ['abc123','abcd123e'],
                _id: 'sadsadasdsadas',
                name: 'Super Custom Burger',
                status: 'pending',
                number: 123456,
                createdAt: 'testdate',
                updatedAt: 'testdate',
            },
            {
                ingredients: ['abcd123e44','abcd123e55'],
                _id: 'eeeeeee',
                name: 'Mohito Burger',
                status: 'pending',
                number: 4433444,
                createdAt: 'testdate',
                updatedAt: 'testdate',
            }
        ],
        total: 434,
        totalToday: 12,
    }

    const initialState = {
        wsConnected: false,
        orders: null,
        total: 0,
        totalToday: 0,
        error: null,
    }

    it('should return initial state', () => {
        expect(ordersHistoryReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ORDERS_HISTORY_CONNECTION_SUCCESS', () => {
        expect(ordersHistoryReducer(initialState, {
            type: ORDERS_HISTORY_CONNECTION_SUCCESS,
            payload: new Event("test"),
        })).toEqual({
            wsConnected: true,
            orders: null,
            total: 0,
            totalToday: 0,
            error: null,
        })
    })

    it('should handle ORDERS_HISTORY_CONNECTION_ERROR', () => {
        expect(ordersHistoryReducer({
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
            error: null,
        }, {
            type: ORDERS_HISTORY_CONNECTION_ERROR,
            payload: new Event("test"),
        })).toEqual({
            wsConnected: false,
            orders: null,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
            error: new Event("test"),
        })
    })

    it('should handle ORDERS_HISTORY_GET_MESSAGE', () => {
        expect(ordersHistoryReducer({
            wsConnected: true,
            orders: null,
            total: 0,
            totalToday: 0,
            error: null,
        }, {
            type: ORDERS_HISTORY_GET_MESSAGE,
            payload: {
                orders: testOrdersData.orders,
                total: testOrdersData.total,
                totalToday: testOrdersData.totalToday,
            },
        })).toEqual({
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
            error: null,
        })
    })

    it('should handle ORDERS_HISTORY_CONNECTION_CLOSED', () => {
        expect(ordersHistoryReducer({
            wsConnected: true,
            orders: testOrdersData.orders,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
            error: null,
        }, {
            type: ORDERS_HISTORY_CONNECTION_CLOSED,
            payload: new Event("test"),
        })).toEqual({
            wsConnected: false,
            orders: null,
            total: testOrdersData.total,
            totalToday: testOrdersData.totalToday,
            error: null,
        })
    })
})