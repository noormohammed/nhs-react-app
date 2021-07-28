import React from "react";
import { Switch, Route } from "react-router-dom";

import DocumentDetails from "views/DocumentDetails";
import DocumentMenu from "views/DocumentMenu";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DocumentDetails mode="read-only" />
      </Route>
      <Route exact path="/document-menu">
        <DocumentMenu />
      </Route>
      <Route exact path="/document-edit">
        <DocumentDetails mode="edit" />
      </Route>
      {/* <Route path="/documentMenu">
        <DocumentMenu />
      </Route>
      <Route path="/editDocument">
        <EditDocument />
      </Route>
      <Route path="/editDocumentField">
        <EditDocumentFormField />
      </Route> */}
    </Switch>
  );
};

export default Routes;
