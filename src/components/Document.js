import React from "react";

import { useDocumentContext } from "contexts/DocumentContext";

/* const caretStyle = {
  display: "inline - block",
  width: 0,
  height: 0,
  marginLeft: 2,
  verticalAlign: "middle",
  borderTop: "4px solid9",
  borderRight: "4px solid transparent",
  borderLeft: "4px solid transparent",
}; */

const Document = ({ mode = "read-only" }) => {
  const [documentInfo] = useDocumentContext();

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
            <div className="label column column-heading">TYPE</div>
            <div className="column">
              {documentInfo?.type}
              {mode === "edit" && (
                <button className="pull-right">
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
                <button className="pull-right">
                  <span className="caret right"></span>
                </button>
              )}
            </div>
          </div>

          <div className="row">
            <div className="label column column-heading">USERS ALLOWED</div>
            <div className="column">
              {documentInfo?.allowed_users.map((item, index) => {
                return `${item}${
                  documentInfo.allowed_users.length - 1 === index ? "" : ", "
                }`;
              })}
              {mode === "edit" && (
                <button className="pull-right">
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
