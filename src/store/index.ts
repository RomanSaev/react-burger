import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'

export const configureStore = () => {
    const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
    const store = createStore(
        rootReducer,
        enhancer
      );

    return store;
}
