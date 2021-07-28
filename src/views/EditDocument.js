import React from "react";

import { useDocumentContext } from "contexts/DocumentContext";
import Page from "components/Page";
import Form from "components/form/Form";
import { TextAreaField } from "components/form/Fields";

const DocumentDetails = () => {
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  const onChange = (e) => {
    setDocumentInfo({
      prevDocumentInfo: {
        ...prevDocumentInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(documentInfo);
  };

  return (
    <Page title="Document Details">
      <Form onSubmit={onSubmit} submitButtonName="Submit">
        <TextAreaField
          label="DESCRIPTION"
          name="description"
          value={documentInfo?.description}
          onChange={onChange}
        />
      </Form>
      <form className="form">
        <div className="table">
          <div className="table-header">
            <div className="row">
              <div className="column">DESCRIPTION</div>
            </div>
          </div>
          <div className="table-body">
            <div className="column">
              <input type="text" name="name" />
            </div>
          </div>
        </div>
      </form>
    </Page>
  );
};

export default DocumentDetails;
