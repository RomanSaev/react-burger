import { Middleware } from "redux";
import { RootState } from "../../types/store";
import { refreshTokens } from "../../utils/react-burger-api";
import { getCookie } from "../../utils/functions-helper";

type TwsMessage = {
    success: false
    message: string
} | {
    success: true
    orders: []
    total: number
    totalToday: number
}

export type TwsActionTypes = {
    wsConnect: string;
    wsDisconnect: string;
    wsConnecting: string;

    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
}

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;
        let wsUrl = '';
        let isConnected = false;
        let reconnectTimer = 0;
    
        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsConnect, wsConnecting, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
            if (type === wsConnect) {
                wsUrl = payload;
                socket = new WebSocket(wsUrl);
                isConnected = true;
                dispatch({ type: wsConnecting })

                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
        
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
        
                socket.onmessage = event => {
                    const data: TwsMessage = JSON.parse(event.data);
                    const { success, ...restData } = data;

                    if (!success && data.message === "Invalid or missing token") {
                        refreshTokens()
                            .then(() => {
                                const wsUrlAfterRefresh = new URL(wsUrl);
                                const token = getCookie('accessToken');
                                wsUrlAfterRefresh.searchParams.set(
                                    'token',
                                    token || ''
                                );
                                dispatch({ //диспатч экшена нового подключения
                                    type: wsConnect,
                                    payload: wsUrlAfterRefresh.href,
                                });
                            })
                            .catch((err) => {
                                dispatch({ type: onError, payload: err });
                            });

                        dispatch({ type: wsDisconnect });  //закрываем предыдущее подключение
                    } else {
                        dispatch({ type: onMessage, payload: restData });
                    }
                };
        
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });

                    if (isConnected) { //прервано внешним фактором
                        dispatch({ type: wsConnecting }); //начинаем реконнект
                        reconnectTimer = window.setTimeout(() => {
                          dispatch({ type: wsConnect, payload: wsUrl });
                        }, 3000)
                    }
                };
            }
            if (socket) {
                //   if (type === wsSendMessage) {
                //     socket.send(JSON.stringify({...payload}));
                //   }

                if (type === wsDisconnect) {
                    isConnected = false;
                    clearTimeout(reconnectTimer);
                    reconnectTimer = 0;
                    socket.close();
                    socket = null;
                    dispatch({ type: onClose });
                }
            }
    
            next(action);
        };
    };
};