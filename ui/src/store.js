import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './rootReducer'

const middlewares = [thunk];
const { logger } = require(`redux-logger`);
    middlewares.push(logger);

export default createStore(rootReducer,applyMiddleware(...middlewares))
