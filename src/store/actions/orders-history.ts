import { TOrdersHistory } from "../../types";
import { TwsActionTypes } from "../middleware/socket-middleware";
import { ORDERS_HISTORY_CONNECTING, ORDERS_HISTORY_CONNECTION_CLOSED, ORDERS_HISTORY_CONNECTION_ERROR, ORDERS_HISTORY_CONNECTION_START, ORDERS_HISTORY_CONNECTION_STOP, ORDERS_HISTORY_CONNECTION_SUCCESS, ORDERS_HISTORY_GET_MESSAGE } from "./actionTypes";

export const ordersHistoryActionTypes: TwsActionTypes = {
    wsConnect: ORDERS_HISTORY_CONNECTION_START,
    wsDisconnect: ORDERS_HISTORY_CONNECTION_STOP,
    wsConnecting: ORDERS_HISTORY_CONNECTING,

    onOpen: ORDERS_HISTORY_CONNECTION_SUCCESS,
    onClose: ORDERS_HISTORY_CONNECTION_CLOSED,
    onError: ORDERS_HISTORY_CONNECTION_ERROR,
    onMessage: ORDERS_HISTORY_GET_MESSAGE,
}

export interface IOrdersHistoryConnectionStartAction {
    readonly type: typeof ORDERS_HISTORY_CONNECTION_START;
    readonly payload: string;
}

export interface IOrdersHistoryConnectionStopAction {
    readonly type: typeof ORDERS_HISTORY_CONNECTION_STOP;
}

export interface IOrdersHistoryConnectingAction {
    readonly type: typeof ORDERS_HISTORY_CONNECTING;
}

export interface IOrdersHistoryConnectionSuccessAction {
    readonly type: typeof ORDERS_HISTORY_CONNECTION_SUCCESS;
    readonly payload: Event;
}

export interface IOrdersHistoryConnectionClosedAction {
    readonly type: typeof ORDERS_HISTORY_CONNECTION_CLOSED;
    readonly payload: Event;
}

export interface IOrdersHistoryConnectionErrorAction {
    readonly type: typeof ORDERS_HISTORY_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IOrdersHistoryGetMessageAction {
    readonly type: typeof ORDERS_HISTORY_GET_MESSAGE;
    readonly payload: TOrdersHistory;
}

export type TOrdersHistoryActions = IOrdersHistoryConnectionStartAction
| IOrdersHistoryConnectionStopAction
| IOrdersHistoryConnectingAction
| IOrdersHistoryConnectionSuccessAction
| IOrdersHistoryConnectionClosedAction
| IOrdersHistoryConnectionErrorAction
| IOrdersHistoryGetMessageAction;

