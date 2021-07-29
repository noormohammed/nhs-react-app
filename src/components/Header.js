import React from "react";
import { useHistory } from "react-router-dom";

import { useDocumentContext } from "contexts/DocumentContext";

const Header = ({ title }) => {
  const history = useHistory();
  const [documentInfo] = useDocumentContext();

  /* Using inline-css here */
  const headerBarStyle = {
    position: "fixed",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#3f50b5",
    borderBottom: "1px solid #d8d8d8",
    fontWeight: "bold",
    padding: "0px 10px",
    boxSizing: "border-box",
    color: "#fff",
    fontSize: 18,
  };

  return (
    <div style={headerBarStyle}>
      {/* Show back button only in document menu and edit views */}
      {history.action &&
        documentInfo?.mode !== "read-only" &&
        documentInfo?.mode !== "edit-field" && (
          <div style={{ width: "10%" }}>
            <button
              onClick={() => {
                history.go(-1);
              }}
            >
              🔙
            </button>
          </div>
        )}
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>{title}</div>

      {documentInfo?.mode && documentInfo?.mode === "read-only" && (
        <div style={{ width: "10%" }}>
          <button
            onClick={() => {
              history.push("/document-menu");
            }}
          >
            <span>{`⚙️`}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
