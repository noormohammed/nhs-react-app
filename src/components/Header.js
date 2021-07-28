import React from "react";
import { useHistory } from "react-router-dom";

import { useDocumentContext } from "contexts/DocumentContext";

const Header = ({ title }) => {
  const history = useHistory();
  const [documentInfo] = useDocumentContext();

  const headerBarStyle = {
    position: "fixed",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#1976d2",
    borderBottom: "1px solid #d8d8d8",
    fontWeight: "bold",
    padding: "0px 20px",
    boxSizing: "border-box",
    color: "#fff",
    fontSize: 18,
  };

  return (
    <div style={headerBarStyle}>
      {/* Show back button only in document menu and edit views */}
      {history.action && documentInfo?.mode !== "read-only" && (
        <button
          onClick={() => {
            history.go(-1);
          }}
        >
          Back
        </button>
      )}
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>{title}</div>
      {/* <span>{`⚙️`}</span> */}
      {documentInfo?.mode && documentInfo?.mode === "read-only" && (
        <button
          onClick={() => {
            history.push("/document-menu");
          }}
        >
          Menu
        </button>
      )}
    </div>
  );
};

export default Header;
