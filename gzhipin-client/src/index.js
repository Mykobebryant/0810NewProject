import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Login from './containers/login';
import Register from './containers/register';
import Main from './containers/main';
import store from './redux/store';

// import './test/socketio_test';

//引入公共的样式
import './assets/less/index.less';

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route component={Main}/>
        </Switch>
      </HashRouter>
    </Provider>
  )
  , document.getElementById('root'));

