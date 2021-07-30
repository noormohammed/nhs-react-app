import React from "react";

/**
 * Creates a form input field element
 * @param {*} object list of input attributes
 * @returns HTML for input element with label
 */
const TextAreaField = ({ name = "", value = "", onChange, ...rest }) => {
  return (
    <div className="field">
      <textarea
        data-testid={`textarea-field-${name}`}
        name={name}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

/**
 * Creates a form select (single/multiple) field element
 * @param {*} object list of select attributes
 * @returns HTML for select element with label
 */
const SelectField = ({ name = "", value = "", onChange, options = [], ...rest }) => {
  return (
    <div className="field">
      <select
        data-testid={`select-field-${name}`}
        name={name}
        defaultValue={value}
        onChange={onChange}
        {...rest}
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { TextAreaField, SelectField };
