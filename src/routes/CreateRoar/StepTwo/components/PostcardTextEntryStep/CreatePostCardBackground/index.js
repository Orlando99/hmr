import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';
import uuid from 'uuid/v4';

import Icon from '../../../../../../common/components/Icon/index';
import {getBackground} from '../../../../../../common/selectors/selectors';
import {postCardConfigureBackground} from '../../../../../../common/actions/postCardConfigurator';

import './index.css';

const colors = ['white', 'grey', 'lightred', 'lightbrown', 'lightyellow', 'lightgreen', 'skyblue', 'lightblue', 'lightpurple'];
const hexValues = ['#ffffff', '#cfcfcf', '#ffc0c8', '#ffe3c0', '#fffac0', '#c0ffc9', '#c0f0ff', '#c0d4ff', '#f2c0ff'];

/**
 * @class CreatePostCardBackground
 */
class CreatePostCardBackground extends React.Component {
  static propTypes  = {
    /** The hex backgroundColor to select */
    backgroundColor: PropTypes.string.isRequired,
    /** The background color selector function */
    postCardConfigureBackground: PropTypes.func.isRequired
  }

  render(){
    const {backgroundColor, postCardConfigureBackground} = this.props;
    return(
      <div>
        <ul className = "colors">
          {
            colors.map((color, idx) => {
              return (
                <li
                  key={uuid()}
                  className={color}
                  onClick={_.partial(postCardConfigureBackground, hexValues[idx])}
                >
                  {hexValues[idx] === backgroundColor ? <Icon name="check"/> : null }
                </li>
              );
            })
          }

        </ul>
        <button onClick={_.partial(postCardConfigureBackground, hexValues[0])}>Reset</button>
      </div>
    );
  }
}

/** @inheritdoc */
function mapStateToProps(state /* ownProps */) {
  return {
    backgroundColor: getBackground(state)
  };
}

export default connect(mapStateToProps, {postCardConfigureBackground})(CreatePostCardBackground);
