// import logo from "./logo.svg";
import "./css/App.css";
import "./css/document.scss";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Routes from "routes/Routes";

import { DocumentContextProvider } from "contexts/DocumentContext";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <DocumentContextProvider>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </DocumentContextProvider>
  );
}

export default App;
