import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { useDocumentContext } from "contexts/DocumentContext";

// Using the modes defined in the environmental variables
const { REACT_APP_DOC_READ_MODE, REACT_APP_DOC_EDIT_MODE, REACT_APP_DOC_MENU_MODE } =
  process.env;

/**
 * Header Component creates the topbar on the page.
 *
 * @component
 * @example
 * return (<Header title="Hello World!" />)
 * @param {*} {title} any string
 */
const Header = ({ title }) => {
  const history = useHistory();
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  /* Using inline-css here */
  const headerBarStyle = {
    position: "fixed",
    top: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#3f50b5",
    borderBottom: "1px solid #d8d8d8",
    fontWeight: "bold",
    padding: "0px 20px 0px 0px",
    boxSizing: "border-box",
    color: "#fff",
    fontSize: 18,
  };

  const handleEditDone = () => {
    // Update the mode before routing
    setDocumentInfo({
      ...documentInfo,
      mode: REACT_APP_DOC_READ_MODE,
    });
    history.push("/");
  };

  return (
    <div style={headerBarStyle}>
      {/* Show back button only in document menu and edit document detail views */}
      <div style={{ width: 50 }}>
        {history?.action &&
          (documentInfo?.mode === REACT_APP_DOC_MENU_MODE ||
            documentInfo?.mode === REACT_APP_DOC_EDIT_MODE) && (
            <button
              onClick={() => {
                history.go(-1);
              }}
            >
              ⬅️
            </button>
          )}
      </div>

      <div style={{ marginLeft: "auto", marginRight: "auto" }}>{title}</div>

      <div style={{ width: 50 }}>
        {documentInfo?.mode && documentInfo?.mode === REACT_APP_DOC_READ_MODE && (
          <button
            onClick={() => {
              history.push("/document-menu");
            }}
            data-testid="menu-button"
          >
            <span>{`⚙️`}</span>
          </button>
        )}

        {documentInfo?.mode && documentInfo?.mode === REACT_APP_DOC_EDIT_MODE && (
          <button onClick={handleEditDone} data-testid="edit-done">
            <span>{`✅`}</span>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Props required to create Header Component
 */
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
