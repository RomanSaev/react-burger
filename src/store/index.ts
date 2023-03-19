import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import { createSocketMiddleware } from './middleware/socket-middleware'
import { ordersFeedActionTypes } from './actions/orders-feed'
import { ordersHistoryActionTypes } from './actions/orders-history'

export const configureStore = () => {
    const enhancer = composeWithDevTools(applyMiddleware(
      thunkMiddleware,
      createSocketMiddleware(ordersFeedActionTypes),
      createSocketMiddleware(ordersHistoryActionTypes),
    ));

    const store = createStore(
        rootReducer,
        enhancer,
      );

    return store;
}
