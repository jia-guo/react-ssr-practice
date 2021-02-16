import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { clientAxios, serverAxios } from './http';
import aboutReducer from './about';
import headerReducer from './header';

const reducer = combineReducers({
  about: aboutReducer,
  header: headerReducer
});

export const getServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
};
export const getClientStore = () => {
  const defaultState = window.__data__ ? window.__data__ : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
};
