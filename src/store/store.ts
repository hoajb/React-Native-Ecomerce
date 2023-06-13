import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from '../reducers/authReducer';
import { cartReducer } from '../reducers/cartReducer';
import { productReducer } from '../reducers/productReducer';
import { useDispatch } from 'react-redux';
import { AuthActionTypes } from '../types/authTypes';


// Combine multiple reducers into a root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
});

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Create the Redux store
const store: Store<RootState> = createStore(
    rootReducer,
    // composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<any, AuthActionTypes>))
);

// Create a custom useDispatch hook that uses the store's dispatch function
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;