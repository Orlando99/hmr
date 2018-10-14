import React from 'react';
import ReactDOM from 'react-dom';

export default class FlipButton extends React.Component {
  constructor(props) {
    super(props);
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard() {
    if (ReactDOM.findDOMNode(this).parentNode.classList.contains('flip'))
      ReactDOM.findDOMNode(this).parentNode.classList.remove('flip');
    else
      ReactDOM.findDOMNode(this).parentNode.classList.add('flip');
  }

  render() {
    return (
      <div className="flipcard button" onClick={this.flipCard}>Flip Postcard</div>
    );
  }
}
