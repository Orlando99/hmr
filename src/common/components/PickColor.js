import React from 'react';
import classnames from 'classnames';
export default class PickColor extends React.Component  {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {active: ''};
  }

  onClick(){
    const color_list = document.getElementsByClassName('pickcolor');
    for(let i = 0; i < color_list.length; i ++){
      color_list[i].classList.remove('active');
    }
    this.setState({active: 'active'});
  }

  render() {
    let classes = classnames(this.props.className, this.state.active, 'pickcolor');
    return (
      <li className = {classes} onClick = {this.onClick}></li>
    );
  }
}