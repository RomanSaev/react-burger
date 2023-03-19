import { Middleware } from "redux";
import { RootState } from "../../types/store";

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
    
        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsConnect, wsConnecting, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
            if (type === wsConnect) {
                socket = new WebSocket(payload);
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
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
        
                    dispatch({ type: onMessage, payload: restParsedData });
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