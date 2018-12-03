import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//开发依赖， 生产时要手动去除
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));