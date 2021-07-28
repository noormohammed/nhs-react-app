import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const DocumentContext = createContext({});

const DocumentContextProvider = ({ children }) => {
  const [documentInfo, setDocumentInfo] = useState(
    window.localStorage.getItem("document_info")
      ? JSON.parse(window.localStorage.getItem("document_info"))
      : { type: "", description: "", allowed_users: [], mode: "read-only" }
  );

  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    const storeDocumentInfo = async () => {
      if (isMountedRef.current) {
        window.localStorage.setItem("document_info", JSON.stringify(documentInfo));
      }
    };
    storeDocumentInfo();

    return () => {
      isMountedRef.current = false;
    };
  }, [documentInfo]);

  return (
    <DocumentContext.Provider value={[documentInfo, setDocumentInfo]}>
      {children}
    </DocumentContext.Provider>
  );
};

const useDocumentContext = () => useContext(DocumentContext);

export { useDocumentContext, DocumentContextProvider };
