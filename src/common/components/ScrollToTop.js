import {withRouter} from 'react-router';
import React from 'react';
import { resetRoarFlow } from '../actions/postCardConfigurator';
import {connect} from 'react-redux';
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      // console.log('this location is', this.props.location);
      if(this.props.location.pathname === '/' || this.props.location.pathname === '/select-roar-type') {
        this.props.resetRoarFlow({dataOnly: true});
      }
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(connect(null, {resetRoarFlow})(ScrollToTop));
// export default withRouter(ScrollToTop);
