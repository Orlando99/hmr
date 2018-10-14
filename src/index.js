import {AppContainer} from 'react-hot-loader';
import {applyMiddleware, compose, createStore} from 'redux';
import {createBrowserHistory} from 'history';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import {Provider} from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers';
import getMainSaga from './sagas';
import {loadLocalStorage} from './lib/localStorage';
import { RETURNING_USER } from './routes/Profile/modules/constants.js';

const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);
store.runSaga = sagaMiddleware.run;
const mainSaga = getMainSaga(store);
sagaMiddleware.run(mainSaga);


/**
 * If our user has a JTW token in local storage
 * Let's log them in
 */
if (loadLocalStorage('hmrToken')) {
  store.dispatch({ type: RETURNING_USER });
}

const render = () => (
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history}/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
);


render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });

  // Reload reducers
  // module.hot.accept('./reducers', () => {
  //   store.replaceReducer(connectRouter(history)(rootReducer));
  // });
}
