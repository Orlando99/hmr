import React from 'react';
import uuid from 'uuid/v4';
import {states} from '../../../lib/generateStates';
import classNames from 'classnames';
import './index.css';
export default class RenderField extends React.Component {
  constructor(props){
    super(props);
    this.state = {isChecked: false};
  }

  render(){
    const {
      input,
      label,
      type,
      placeholder,
      className,
      price,
      meta:
        {
          touched,
          error
        }
    } = this.props;

    switch (type) {
    case 'checkbox':
      return (
        <div className={className}>
          <label>{label}</label>
          <div className='checkbox-div'>
            <input
              {...input}
              placeholder={label}
              type={type}
            />
            <span className={classNames(
              'checkmark',
              {'checked': input.value}
            )} ref="checkmark"></span>
          </div>
        </div>
      );
    case 'price-checkbox':
      return (
        <div className={className}>
          <label>{label}</label>
          <div className='checkbox-div'>
            <input
              {...input}
              placeholder={label}
              type='checkbox'
            />
            <span className={classNames(
              'checkmark',
              {'checked': input.value}
            )} ref="checkmark"></span>
          </div>
          <div className={classNames(
            'price',
            {'checked': this.state.isChecked}
          )} ref='price'>
            {'+$' + price.toFixed(2)}
          </div>
        </div>
      );
    case 'radio':
    case 'password':
    case 'text':
      return (
        <div className={className}>
          <label>{label}</label>
          <div className={classNames('input', {'error': touched && error!==undefined})}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched && error && <div className='error_str'>{error}</div>}
          </div>
        </div>
      );
    case 'select':
      return (
        <div className={className}>
          <label>{label}</label>
          <div>
            <select {...input} type={type}>
              {
                states.map(state =>
                  <option key={uuid()} value={state}>{state}</option>
                )
              }
            </select>
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      );
    case 'textarea':
      return (
        <React.Fragment>
          <textarea
            {...input}
            type={type}
            placeholder={placeholder}
            maxLength='700'
            spellCheck="true"
          />
          {touched && error && <div className='errorstr'>{error}</div>}
        </React.Fragment>
      );
    default:
      return (
        <div className={className}>
          <label>{label}</label>
          <div className={classNames('input', {'error': touched && error!==undefined})}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched && error && <div className='error_str'>{error}</div>}
          </div>
        </div>
      );
    }
  }
}
