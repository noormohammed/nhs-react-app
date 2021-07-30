import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { DocumentContextProvider } from "contexts/DocumentContext";
import DocumentMenu from "views/DocumentMenu";

const browserHistory = createBrowserHistory();

const documentInfo = null;
const setDocumentInfo = jest.fn();

describe("<DocumentMenu /> Tests", () => {
  let container;
  beforeEach(() => {
    ({ container } = render(
      <DocumentContextProvider value={[documentInfo, setDocumentInfo]}>
        <Router history={browserHistory}>
          <DocumentMenu />
        </Router>
      </DocumentContextProvider>
    ));
  });

  afterEach(cleanup);

  test("renders DocumentMenu correctly", () => {
    expect(container).toMatchSnapshot();
  });

  test("renders correct title", () => {
    expect(screen.getByText(/Document Menu/i)).toBeTruthy();
  });

  test("Menu Options has an option called 'Edit'", () => {
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  test("Menu Options has an Edit action button", () => {
    const editBtn = container.getElementsByClassName("menu-action-button");
    expect(editBtn.length).toEqual(1);
  });

  test("trigger Edit action button click to push Edit Document view", () => {
    userEvent.click(screen.getByTestId("edit-action-button"));
    expect(browserHistory.location.pathname).toBe("/document-edit");
  });
});
