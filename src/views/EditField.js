import React from "react";
import { useLocation, useHistory } from "react-router";

import { useDocumentContext } from "contexts/DocumentContext";
import Page from "components/Page";
import Form from "components/form/Form";
import { TextAreaField, SelectField } from "components/form/Fields";

const EditField = () => {
  const history = useHistory();
  const location = useLocation();
  const fieldAttributes = location?.state;
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  const handleChange = (event) => {
    let targetValue;

    if (fieldAttributes?.type === "select" && fieldAttributes?.multiple) {
      targetValue = Array.from(event.target.selectedOptions, (option) =>
        parseInt(option.value, 10)
      );
      if (!targetValue[0]) return;
    } else {
      targetValue = event.target.value;
    }

    setDocumentInfo({
      ...documentInfo,
      [event.target.name]: targetValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /* if (fieldAttributes.required) {
      if (!documentInfo[fieldAttributes.name]) {
        alert("This field is mandatory.");
        return;
      }
    } */
    history.goBack();
  };

  return (
    <Page title={fieldAttributes.title || "Enter Value"}>
      <Form onSubmit={handleSubmit} submitButtonName="Done">
        {fieldAttributes.type === "textarea" ? (
          <TextAreaField
            onChange={handleChange}
            value={documentInfo[fieldAttributes.name]}
            {...fieldAttributes}
          />
        ) : (
          <SelectField
            onChange={handleChange}
            value={documentInfo[fieldAttributes.name]}
            {...fieldAttributes}
          />
        )}
      </Form>
    </Page>
  );
};

export default EditField;
