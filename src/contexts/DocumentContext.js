import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

/**
 * DocumentContext for Document details
 */

const DocumentContext = createContext({});

/**
 * Document Provider using the DocumentContext
 * @param {*} children any props/children components passed to the DocumentContextProvider
 * @returns memoized object of document info/details state, set state function
 */
const DocumentContextProvider = ({ children }) => {
  // Once the document info is memoized, we store the info in the localStorage
  // for ease of access and its also economical (can avoid too many backend calls).
  const [documentInfo, setDocumentInfo] = useState(
    window.localStorage.getItem("document_info")
      ? JSON.parse(window.localStorage.getItem("document_info"))
      : null
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
