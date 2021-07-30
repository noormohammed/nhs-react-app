import React, { useState } from "react";
import { useLocation, useHistory } from "react-router";

import { useDocumentContext } from "contexts/DocumentContext";
import Page from "components/Page";
import Form from "components/form/Form";
import { TextAreaField, SelectField } from "components/form/Fields";

/**
 * EditField Component generates a view to display a form with editable field
 *
 * @component
 * @example
 * return (<EditField />)
 */
const EditField = () => {
  const history = useHistory();
  const location = useLocation();
  const fieldData = location?.state;
  const [documentInfo, setDocumentInfo] = useDocumentContext();
  const [fieldValue, setFieldValue] = useState(
    documentInfo ? documentInfo[fieldData?.name] : ""
  );

  const handleChange = (event) => {
    let targetValue;

    // Any field onChange value gets stored in local state,
    // and pushing it to the context only on form submit.

    if (fieldData?.type === "select" && fieldData?.multiple) {
      // Creating an array of selected options for select-multiple
      targetValue = Array.from(event.target.selectedOptions, (option) =>
        parseInt(option.value, 10)
      );
      if (!targetValue[0]) return;
    } else {
      targetValue = event.target.value;
    }

    setFieldValue(targetValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Relying on default browser validations for this test app,
    // as writing a validation library is beyond the scope of this test

    if (!fieldValue && fieldData.required) return;

    setDocumentInfo({
      ...documentInfo,
      [fieldData?.name]: fieldValue,
    });

    history?.goBack();
  };

  return (
    <Page title={fieldData?.title || "Enter Value"}>
      <Form onSubmit={handleSubmit} submitButtonName="Submit">
        {fieldData?.type === "textarea" && (
          <TextAreaField onChange={handleChange} value={fieldValue} {...fieldData} />
        )}
        {fieldData?.type === "select" && (
          <SelectField
            onChange={handleChange}
            value={documentInfo[fieldData?.name]}
            {...fieldData}
          />
        )}
      </Form>
    </Page>
  );
};

export default EditField;
