import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// import reducers
import concerts from './concertsRedux';
import seats from './seatsRedux';

// combine reducers
const rootReducer = combineReducers({
  concerts,
  seats,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;