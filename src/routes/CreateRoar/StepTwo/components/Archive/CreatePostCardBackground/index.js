import React from 'react';
import avatar_url from '../../../../../../assets/images/Bitmap.png';
import FlipButton from '../../../../../../common/components/FlipButton';
import {connect} from 'react-redux';
import _ from 'lodash';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import {getBackground} from '../../../../../../common/selectors/selectors';
import {postCardConfigureBackground} from '../../../../../../common/actions/postCardConfigurator';
import Icon from '../../../../../../common/components/Icon/index';
import './index.css';

const colors = ['white', 'grey', 'lightred', 'lightbrown', 'lightyellow', 'lightgreen', 'skyblue', 'lightblue', 'lightpurple'];
const hexValues = ['#ffffff', '#cfcfcf', '#ffc0c8', '#ffe3c0', '#fffac0', '#c0ffc9', '#c0f0ff', '#c0d4ff', '#f2c0ff'];
class CreatePostCardBackground extends React.Component {

  static propTypes = {
    /** Picks the Background color of the post card */
    postCardConfigureBackground: PropTypes.func.isRequired,
    /** The selected hex backgroundColor */
    backgroundColor: PropTypes.string.isRequired
  }

  /** @inheritdoc */
  render(){
    const {postCardConfigureBackground, backgroundColor} = this.props;
    return(
      <div className="createPostcardMessage CreatePostCardBackground">
        <div className="mainpart">
          <div className="content_container">
            <div className="content">
              <div className="rightpart desktop">
                <div className="assets_container">
                  <div className="avatar">
                    <img src = {avatar_url} alt = "Avatar" height = "90.9" />
                  </div>
                  <div className="rectangle"></div>
                </div>
                <FlipButton />
                <div className="clear"></div>
              </div>
              <div className="centerpart">
                <ul className="colors">
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
                {/* Assuming Reset is going to be White */}
                <button onClick={_.partial(postCardConfigureBackground, hexValues[0])}>Resetasdkjhfasda</button>
              </div>
            </div>
          </div>
        </div>
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
