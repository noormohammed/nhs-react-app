import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDocumentContext } from "contexts/DocumentContext";
import Page from "components/Page";
import DocumentTypeOptions from "static/document_types";
import DocumentUsers from "static/document_users";
import SampleDocumentDetails from "static/sample_document_details";

// Using the modes defined in the environmental variables
const { REACT_APP_DOC_READ_MODE, REACT_APP_DOC_EDIT_MODE } = process.env;

const DocumentSection = ({ labelClass, label, testId, children }) => {
  return (
    <div className="row">
      <div className={labelClass}>{label}</div>
      <div className="column" style={{ padding: "20px 10px" }} data-testid={testId}>
        {children}
      </div>
    </div>
  );
};

const DocumentDetails = ({ mode }) => {
  const history = useHistory();
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  useEffect(() => {
    // Document details can be fetched / pulled here from an API
    // For the sake this test, we are fetching from a json file
    const getDocumentDetails = () => {
      if (!documentInfo || Object.entries(documentInfo).length <= 1) {
        setDocumentInfo({
          ...SampleDocumentDetails,
          mode: mode,
        });
      } else {
        setDocumentInfo({
          ...documentInfo,
          mode: mode,
        });
      }
    };

    getDocumentDetails();
    return () => {};
  }, []);

  // Extracting name from array object
  const findNameFromArray = (givenArray, condition) => {
    return givenArray
      .filter((obj) => {
        return obj.id === condition;
      })
      .map((item) => item.name)[0];
  };

  const handleClickForEditField = (e, fieldAttributes) => {
    e.preventDefault();
    setDocumentInfo({
      ...documentInfo,
      mode: "edit-field",
    });
    history?.push({
      pathname: "/edit-field",
      state: fieldAttributes,
    });
  };

  return (
    <Page
      title={mode === REACT_APP_DOC_EDIT_MODE ? "Edit Document" : "Document Details"}
    >
      <div className="document">
        {documentInfo?.mode === REACT_APP_DOC_READ_MODE ? (
          <div className="heading">DOCUMENT INFORMATION</div>
        ) : (
          <div className="heading">Make additions to the document below.</div>
        )}
      </div>
      <div className="table">
        <div className="table-body">
          <DocumentSection
            labelClass={`label column-heading column  ${
              mode === REACT_APP_DOC_EDIT_MODE && "required"
            }`}
            label="NAME"
            testId="name"
          >
            <button
              className="edit-detail-button"
              onClick={(e) =>
                mode === REACT_APP_DOC_EDIT_MODE &&
                handleClickForEditField(e, {
                  title: "Enter Name",
                  type: "textarea",
                  required: "required",
                  name: "name",
                  maxLength: 50,
                  rows: 1,
                  cols: 50,
                })
              }
            >
              {documentInfo?.name}
              {mode === REACT_APP_DOC_EDIT_MODE && (
                <span className="caret right"></span>
              )}
            </button>
          </DocumentSection>

          <DocumentSection
            labelClass={`label column column-heading ${
              mode === REACT_APP_DOC_EDIT_MODE && "required"
            }`}
            label="TYPE"
            testId="type"
          >
            <button
              className="edit-detail-button"
              onClick={(e) =>
                mode === REACT_APP_DOC_EDIT_MODE &&
                handleClickForEditField(e, {
                  title: "Select Type",
                  type: "select",
                  required: "required",
                  name: "type",
                  options: DocumentTypeOptions,
                })
              }
            >
              {findNameFromArray(
                DocumentTypeOptions,
                parseInt(documentInfo?.type, 10)
              )}
              {mode === REACT_APP_DOC_EDIT_MODE && (
                <span className="caret right"></span>
              )}
            </button>
          </DocumentSection>

          <DocumentSection
            labelClass="label column column-heading"
            label="DESCRIPTION"
            testId="description"
          >
            <button
              className="edit-detail-button"
              onClick={(e) =>
                mode === REACT_APP_DOC_EDIT_MODE &&
                handleClickForEditField(e, {
                  title: "Enter Description",
                  type: "textarea",
                  name: "description",
                  maxLength: 100, //This value can be increased for a real time app
                  rows: 3,
                  cols: 50,
                })
              }
              style={{ fontSize: 18 }}
            >
              {documentInfo?.description}
              {mode === REACT_APP_DOC_EDIT_MODE && (
                <span className="caret right"></span>
              )}
            </button>
          </DocumentSection>

          <DocumentSection
            labelClass="label column column-heading"
            label="USERS ALLOWED"
            testId="allowed_users"
          >
            <button
              className="edit-detail-button"
              onClick={(e) =>
                mode === REACT_APP_DOC_EDIT_MODE &&
                handleClickForEditField(e, {
                  title: "Select Users Allowed Access",
                  type: "select",
                  multiple: true,
                  name: "allowed_users",
                  options: DocumentUsers,
                })
              }
            >
              {documentInfo?.allowed_users?.map((item, index) => {
                let userName = findNameFromArray(DocumentUsers, parseInt(item, 10));
                return `${userName}${
                  documentInfo.allowed_users.length - 1 === index ? "" : ", "
                }`;
              })}
              {mode === REACT_APP_DOC_EDIT_MODE && (
                <span className="caret right"></span>
              )}
            </button>
          </DocumentSection>
        </div>
      </div>
    </Page>
  );
};

export default DocumentDetails;
