import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDocumentContext } from "contexts/DocumentContext";
import Page from "components/Page";

// Using the modes defined in the environmental variables
const { REACT_APP_DOC_MENU_MODE } = process.env;

const DocumentMenu = () => {
  const history = useHistory();
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  useEffect(() => {
    setDocumentInfo({
      ...documentInfo,
      mode: REACT_APP_DOC_MENU_MODE,
    });
    return () => {};
  }, []);

  return (
    <Page title="Document Menu">
      <div className="document">
        <div className="heading">
          Below are the options available for this document.
        </div>

        <div className="table">
          <div className="table-body">
            <div className="row">
              <div className="table-header label column column-heading">
                MENU OPTIONS
              </div>
              <div className="column">
                <button
                  className="menu-action-button"
                  onClick={() => {
                    history.push("/document-edit");
                  }}
                  data-testid="edit-action-button"
                >
                  Edit
                  <span className="caret right"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default DocumentMenu;
