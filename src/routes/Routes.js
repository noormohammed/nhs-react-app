import React from "react";
import { Switch, Route } from "react-router-dom";

import DocumentDetails from "views/DocumentDetails";
import DocumentMenu from "views/DocumentMenu";
import EditField from "views/EditField";

// Using the modes defined in the environmental variables
const { REACT_APP_DOC_READ_MODE, REACT_APP_DOC_EDIT_MODE } = process.env;

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DocumentDetails mode={REACT_APP_DOC_READ_MODE} />
      </Route>
      <Route exact path="/document-menu">
        <DocumentMenu />
      </Route>
      <Route exact path="/document-edit">
        <DocumentDetails mode={REACT_APP_DOC_EDIT_MODE} />
      </Route>
      <Route exact path="/edit-field">
        <EditField />
      </Route>
    </Switch>
  );
};

export default Routes;
