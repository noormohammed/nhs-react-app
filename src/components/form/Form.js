import React from "react";
import PropTypes from "prop-types";

/**
 * Creates a form
 * @param {*} object form attributes as an object
 * @returns HTML for form element
 */
const Form = ({ children, onSubmit, submitButtonName = "" }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset>{children}</fieldset>
      <div style={{ textAlign: "center" }}>
        <button type="submit">{submitButtonName || "Submit"}</button>
      </div>
    </form>
  );
};

/**
 * Props required to create this particular card
 */
Form.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonName: PropTypes.string,
};

export default Form;
