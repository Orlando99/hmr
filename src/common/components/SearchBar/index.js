import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import {Field, reduxForm} from 'redux-form';
import RenderField from '../Form/RenderField';

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchFn: PropTypes.func
};

/**
 * @class SearchBar
 */
function SearchBar({placeholder, searchFn}) {
  return (
    <div className="searchbox">
      <React.Fragment>
        <Icon name="search"/>
        <Field
          name="search"
          type="text"
          placeholder={placeholder}
          component={RenderField}
          onChange={searchFn}
        />
      </React.Fragment>
    </div>
  );
}

export default reduxForm({
  form: 'wallofroars',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true
})(SearchBar);
