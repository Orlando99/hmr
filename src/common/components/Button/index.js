import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// import classnames from "classnames";

import "./index.css";

Button.propTypes = {
  /** The passed in children */
  children: PropTypes.string.isRequired,
  /** The click handler */
  onClick: PropTypes.func,
  /** Type of Button */
  type: PropTypes.oneOfType(["primary"])
};

Button.defaultTypes = {
  onClick: _.noop,
  type: "primary"
};

/**
 * The Button Component
 *
 * @class Button
 */
function Button({children, onClick, type}) {
  return (
    <button
      onClick={onClick}
      className={`btn ${type}`}
    >
      <span className="content">{children}</span>
    </button>
  );
}

export default Button;
