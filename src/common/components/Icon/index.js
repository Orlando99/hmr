import React from "react";
import PropTypes from "prop-types";

Icon.propTypes = {
  /** name of the icon */
  name: PropTypes.string
};

/**
 * The Icon Component
 *
 * @class Icon
 */
function Icon({name}) {
  return (
    <i className={`fa fa-${name}`}></i>
  );
}


export default Icon;
