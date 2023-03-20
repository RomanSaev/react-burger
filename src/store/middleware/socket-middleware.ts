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
    
        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsConnect, wsConnecting, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
            if (type === wsConnect) {
                wsUrl = payload;
                socket = new WebSocket(wsUrl);
                dispatch({ type: wsConnecting })
            }
            if (socket) {
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
                };
        
                //   if (type === wsSendMessage) {
                //     socket.send(JSON.stringify({...payload}));
                //   }

                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                }
            }
    
            next(action);
        };
    };
};