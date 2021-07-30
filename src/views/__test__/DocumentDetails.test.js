import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { DocumentContextProvider } from "contexts/DocumentContext";
import DocumentDetails from "views/DocumentDetails";

// Using the modes defined in the environmental variables
const { REACT_APP_DOC_READ_MODE, REACT_APP_DOC_EDIT_MODE } = process.env;

const browserHistory = createBrowserHistory();

const documentInfo = null;
const setDocumentInfo = jest.fn();

describe("<DocumentDetails /> in read-only mode", () => {
  let getByTestId;
  beforeEach(() => {
    ({ getByTestId } = render(
      <DocumentContextProvider value={[documentInfo, setDocumentInfo]}>
        <Router history={browserHistory}>
          <DocumentDetails mode={REACT_APP_DOC_READ_MODE} />
        </Router>
      </DocumentContextProvider>
    ));
  });

  afterEach(cleanup);

  test("renders DocumentDetails correctly", () => {
    expect(getByTestId).toMatchSnapshot();
  });

  test("renders correct title", () => {
    expect(screen.getByText(/Document Details/i)).toBeTruthy();
  });

  test("renders the Document Name", () => {
    expect(getByTestId("name")).toHaveTextContent("Sample Document");
  });

  test("renders the Document Type", () => {
    expect(getByTestId("type")).toHaveTextContent("Standard");
  });

  test("renders the Document Description", () => {
    expect(getByTestId("description").textContent).toContain(
      "To be completed by doctors."
    );
  });

  test("renders the Document Users Allowed to access", () => {
    expect(getByTestId("allowed_users").textContent).toContain("User 2, User 3");
    expect(getByTestId("allowed_users").textContent).not.toContain("User 4");
  });

  test("check if Menu button exists", () => {
    expect(getByTestId("menu-button")).toBeTruthy();
    expect(getByTestId("menu-button")).toBeInTheDocument();
    expect(getByTestId("menu-button").textContent).toBe("⚙️");
  });

  test("trigger Menu button click and view changed to Document Menu", () => {
    const menuBtn = screen.getByText("⚙️");
    expect(menuBtn).toBeInTheDocument();

    userEvent.click(menuBtn);
    expect(browserHistory.length).toEqual(2);
    expect(browserHistory.location.pathname).toBe("/document-menu");
  });
});

describe("<DocumentDetails /> in edit mode", () => {
  let container;
  beforeEach(() => {
    ({ container } = render(
      <DocumentContextProvider value={[documentInfo, setDocumentInfo]}>
        <Router history={browserHistory}>
          <DocumentDetails mode={REACT_APP_DOC_EDIT_MODE} />
        </Router>
      </DocumentContextProvider>
    ));
  });

  afterEach(cleanup);

  test("renders DocumentDetails correctly", () => {
    expect(container).toMatchSnapshot();
  });

  test("renders DocumentDetails correctly", () => {
    expect(screen.getByText(/Edit Document/i)).toBeTruthy();
  });

  test("check if document has six buttons", () => {
    const allBtns = screen.getAllByRole("button");
    expect(allBtns).toHaveLength(6);
  });

  test("check if document has four carets icons for edit buttons", () => {
    expect(container.getElementsByClassName("caret").length).toBe(4);
  });

  test("check if document has four edit buttons", () => {
    const allEditBtns = container.getElementsByClassName("edit-detail-button");
    expect(allEditBtns.length).toBe(4);
  });

  test("trigger Document Detail edit click to push edit field view", () => {
    const allEditBtns = container.getElementsByClassName("edit-detail-button");

    userEvent.click(allEditBtns[0]);
    expect(browserHistory.location.pathname).toBe("/edit-field");
  });

  test("trigger Tick ✅ button click to return back to Document Details view", () => {
    const tickBtn = screen.getByTestId("edit-done");

    userEvent.click(tickBtn);
    expect(browserHistory.location.pathname).toBe("/");
  });
});
