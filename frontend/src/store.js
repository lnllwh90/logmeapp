import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const vsCodeEnhancer = {
  realtime: true,
  name: 'logme',
  hostname: 'localhost',
  port: 8000
}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware, vsCodeEnhancer))
);

export default store;

// const store = configureStore({
//   reducer: rootReducer,
//   initialState,
//   // composeWithDevTools(applyMiddleware(...middleware))
// }) 
// ;

// export default store;

// initialState,
//     rootReducer,
//     
//   composeWithDevTools(applyMiddleware(...middleware))
  

// 
    