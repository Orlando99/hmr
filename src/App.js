import React from 'react';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router/immutable';
import routes from './routes';
import ScrollToTop from './common/components/ScrollToTop';
import './assets/css/style.css';

const App = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <ScrollToTop>
        {routes}
      </ScrollToTop>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
