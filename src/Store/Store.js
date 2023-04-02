import onSubmitReducer from "../Redux/Reducer";
import {createStore} from 'redux'

const store = createStore(onSubmitReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;