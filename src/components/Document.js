import React from "react";
import { useHistory } from "react-router-dom";
import { useDocumentContext } from "contexts/DocumentContext";

import DocumentTypeOptions from "static/document_types";
import DocumentUsers from "static/document_users";

const Document = ({ mode = "read-only" }) => {
  const history = useHistory();
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  // Extracting name from array object
  const findNameFromArray = (givenArray, condition) => {
    return givenArray
      .filter((obj) => {
        return obj.id === condition;
      })
      .map((item) => item.name)[0];
  };

  // Get the name of the document type from the document type id
  /* const documentTypeName = DocumentTypeOptions.filter((obj) => {
    return obj.id === parseInt(documentInfo?.type, 10);
  }).map((item) => item.name)[0]; */

  const handleClickForEditField = (e, fieldAttributes) => {
    e.preventDefault();
    setDocumentInfo({
      ...documentInfo,
      mode: "edit-field",
    });
    history.push({
      pathname: "/edit-field",
      state: fieldAttributes,
    });
  };

  return (
    <>
      <div className="document">
        {documentInfo?.mode === "read-only" ? (
          <div className="heading">DOCUMENT INFORMATION</div>
        ) : (
          <div className="heading">Make additions to the document below.</div>
        )}
      </div>
      <div className="table">
        <div className="table-body">
          <div className="row">
            <div
              className={`label column column-heading ${
                mode === "edit" && "required"
              }`}
            >
              Name
            </div>
            <div className="column">
              {documentInfo?.name}
              {mode === "edit" && (
                <button
                  className="pull-right"
                  onClick={(e) =>
                    handleClickForEditField(e, {
                      title: "Enter Name",
                      type: "textarea",
                      required: "required",
                      name: "name",
                      // value: documentInfo?.name,
                      maxLength: 50,
                      rows: 1,
                      cols: 50,
                    })
                  }
                >
                  <span className="caret right"></span>
                </button>
              )}
            </div>
          </div>
          <div className="row">
            <div
              className={`label column column-heading ${
                mode === "edit" && "required"
              }`}
            >
              TYPE
            </div>
            <div className="column">
              {findNameFromArray(
                DocumentTypeOptions,
                parseInt(documentInfo?.type, 10)
              )}
              {mode === "edit" && (
                <button
                  className="pull-right"
                  onClick={(e) =>
                    handleClickForEditField(e, {
                      title: "Select Type",
                      type: "select",
                      required: "required",
                      name: "type",
                      // value: documentInfo?.type,
                      options: DocumentTypeOptions,
                    })
                  }
                >
                  <span className="caret right"></span>
                </button>
              )}
            </div>
          </div>

          <div className="row">
            <div className="label column column-heading">DESCRIPTION</div>
            <div className="column">
              {documentInfo?.description}
              {mode === "edit" && (
                <button
                  className="pull-right"
                  onClick={(e) =>
                    handleClickForEditField(e, {
                      title: "Enter Description",
                      type: "textarea",
                      name: "description",
                      maxLength: 100, //This value can be increased for a real time app
                      rows: 3,
                      cols: 50,
                    })
                  }
                >
                  <span className="caret right"></span>
                </button>
              )}
            </div>
          </div>

          <div className="row">
            <div className="label column column-heading">USERS ALLOWED</div>
            <div className="column">
              {documentInfo?.allowed_users.map((item, index) => {
                let userName = findNameFromArray(DocumentUsers, parseInt(item, 10));
                return `${userName}${
                  documentInfo.allowed_users.length - 1 === index ? "" : ", "
                }`;
              })}
              {mode === "edit" && (
                <button
                  className="pull-right"
                  onClick={(e) =>
                    handleClickForEditField(e, {
                      title: "Select Access Allowed",
                      type: "select",
                      multiple: true,
                      name: "allowed_users",
                      value: documentInfo?.allowed_users,
                      options: DocumentUsers,
                    })
                  }
                >
                  <span className="caret right"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Document;
