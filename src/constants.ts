import { OrderStatusTypes, TOrderData } from "./types";

export const BASE_URL = 'norma.nomoreparties.space'
export const BURGER_API_URL = `https://${BASE_URL}/api`;

//API
export const ENDPOINT_INGREDIENTS = '/ingredients'
export const ENDPOINT_MAKE_ORDER = '/orders'
export const ENDPOINT_LOGIN = '/auth/login'
export const ENDPOINT_REGISTER = '/auth/register'
export const ENDPOINT_PASSWORD_FORGOT = '/password-reset'
export const ENDPOINT_PASSWORD_RESET = '/password-reset/reset'
export const ENDPOINT_USER = '/auth/user'
export const ENDPOINT_LOGOUT = '/auth/logout'
export const ENDPOINT_TOKEN_REFRESH = '/auth/token'
export const ENDPOINT_ORDER = '/orders'

// WebSockets
export const WS_BASE = `wss://${BASE_URL}`
export const WS_ORDERS_FEED = `${WS_BASE}/orders/all`
export const WS_ORDERS_HISTORY = `${WS_BASE}/orders`

export const ORDER_DONE_STATUS = 'Выполнен';
export const ORDER_PENDING_STATUS = 'Готовится';
export const ORDER_CREATED_STATUS = 'Создан';

export const ORDER_NUMBERS_LIST_MAX_COUNT = 10;