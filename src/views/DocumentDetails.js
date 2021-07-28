import React, { useEffect } from "react";

import { useDocumentContext } from "contexts/DocumentContext";
import Page from "components/Page";
import Document from "components/Document";

import SampleDocumentDetails from "static/sample_document_details";

const DocumentDetails = ({ mode }) => {
  const [documentInfo, setDocumentInfo] = useDocumentContext();

  useEffect(() => {
    // Document details can be fetched / pulled here from an API
    // For the sake this test, we are fetching from a json file
    const getDocumentDetails = () => {
      setDocumentInfo({
        ...documentInfo,
        ...SampleDocumentDetails,
        mode: mode,
      });
    };

    getDocumentDetails();
    return () => {};
  }, []);

  return (
    <Page title={mode === "edit" ? "Edit Document" : "Document Details"}>
      <Document mode={mode} />
    </Page>
  );
};

export default DocumentDetails;
