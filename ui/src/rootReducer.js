import { combineReducers } from "redux";
import loginReducer from './Reducer/loginReducer'
import dashboardReducer from './Reducer/DashboardReducer'
import userReducer from './Reducer/UserReducer'

const rrducer = combineReducers({
    loginReducer,
    dashboardReducer,
    userReducer
})

export default rrducer