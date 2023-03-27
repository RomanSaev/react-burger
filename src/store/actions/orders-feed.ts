import { TOrdersFeed } from "../../types";
import { TwsActionTypes } from "../middleware/socket-middleware";
import { ORDERS_FEED_CONNECTION_CLOSED, ORDERS_FEED_CONNECTING, ORDERS_FEED_CONNECTION_ERROR, ORDERS_FEED_CONNECTION_START, ORDERS_FEED_CONNECTION_STOP, ORDERS_FEED_CONNECTION_SUCCESS, ORDERS_FEED_GET_MESSAGE } from "./actionTypes";

export const ordersFeedActionTypes: TwsActionTypes = {
    wsConnect: ORDERS_FEED_CONNECTION_START,
    wsDisconnect: ORDERS_FEED_CONNECTION_STOP,
    wsConnecting: ORDERS_FEED_CONNECTING,

    onOpen: ORDERS_FEED_CONNECTION_SUCCESS,
    onClose: ORDERS_FEED_CONNECTION_CLOSED,
    onError: ORDERS_FEED_CONNECTION_ERROR,
    onMessage: ORDERS_FEED_GET_MESSAGE,
}

export interface IOrdersFeedConnectionStartAction {
    readonly type: typeof ORDERS_FEED_CONNECTION_START;
    readonly payload: string;
}

export interface IOrdersFeedConnectionStopAction {
    readonly type: typeof ORDERS_FEED_CONNECTION_STOP;
}

export interface IOrdersFeedConnectingAction {
    readonly type: typeof ORDERS_FEED_CONNECTING;
}

export interface IOrdersFeedConnectionSuccessAction {
    readonly type: typeof ORDERS_FEED_CONNECTION_SUCCESS;
    readonly payload: Event;
}

export interface IOrdersFeedConnectionClosedAction {
    readonly type: typeof ORDERS_FEED_CONNECTION_CLOSED;
    readonly payload?: Event;
}

export interface IOrdersFeedConnectionErrorAction {
    readonly type: typeof ORDERS_FEED_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IOrdersFeedGetMessageAction {
    readonly type: typeof ORDERS_FEED_GET_MESSAGE;
    readonly payload: TOrdersFeed;
}

export type TOrdersFeedActions = IOrdersFeedConnectionStartAction
| IOrdersFeedConnectionStopAction
| IOrdersFeedConnectingAction
| IOrdersFeedConnectionSuccessAction
| IOrdersFeedConnectionClosedAction
| IOrdersFeedConnectionErrorAction
| IOrdersFeedGetMessageAction;

