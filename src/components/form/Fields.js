import React from "react";

/**
 * Creates a form input field element
 * @param {*} object list of input attributes
 * @returns HTML for input element with label
 */
const TextAreaField = ({ name = "", value = "", onChange, ...rest }) => {
  return (
    <div className="field">
      <textarea name={name} onChange={onChange} value={value} {...rest}></textarea>
    </div>
  );
};

/**
 * Creates a form select (single/multiple) field element
 * @param {*} object list of select attributes
 * @returns HTML for select element with label
 */
const SelectField = ({ name = "", onChange, options = [], ...rest }) => {
  return (
    <div className="field">
      <select {...rest} name={name} onChange={onChange}>
        {options.map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export { TextAreaField, SelectField };
