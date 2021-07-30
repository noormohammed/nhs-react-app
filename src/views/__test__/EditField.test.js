import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { DocumentContextProvider } from "contexts/DocumentContext";
import EditField from "views/EditField";
import SampleDocumentDetails from "static/sample_document_details";
import userEvent from "@testing-library/user-event";

// Using the modes defined in the environmental variables
const { REACT_APP_DOC_EDIT_FIELD_MODE } = process.env;

const documentInfo = { ...SampleDocumentDetails };
documentInfo["mode"] = REACT_APP_DOC_EDIT_FIELD_MODE;
const setDocumentInfo = jest.fn();

describe("<EditField /> TextArea Tests", () => {
  let container;
  // sample field data for testing, passed into state of history
  const textAreaFieldData = {
    title: "Enter Name",
    type: "textarea",
    required: "required",
    name: "name",
    maxLength: 50,
    rows: 1,
    cols: 50,
  };

  const history = createMemoryHistory();
  history.push("/edit-field", textAreaFieldData);

  beforeEach(() => {
    ({ container } = render(
      <DocumentContextProvider value={[documentInfo, setDocumentInfo]}>
        <Router history={history}>
          <EditField />
        </Router>
      </DocumentContextProvider>
    ));
  });

  afterEach(cleanup);

  test("renders DocumentMenu correctly", () => {
    expect(container).toMatchSnapshot();
  });

  test("renders title correctly", () => {
    expect(screen.getByText(/Enter Name/i)).toBeInTheDocument();
  });

  test("renders a form field", () => {
    expect(screen.findByRole("form")).toBeTruthy();
    expect(container.getElementsByClassName("form")).toHaveLength(1);
  });

  test("renders a textarea field", async () => {
    const textfield = screen.getByTestId(`textarea-field-${textAreaFieldData.name}`);
    expect(screen.findByRole("textarea")).toBeTruthy();
    expect(textfield).toBeInTheDocument();
  });

  test("renders a submit button", () => {
    expect(screen.getByText("Submit")).toBeTruthy();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("submit button click on empty textarea value does not yeild", () => {
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(history.location.pathname).not.toBe("/document-edit");
    // Browser validation is working.
    // Submit did not complete since the value of the textarea is empty
    // hence the view does not change as tested below.
    expect(history.location.pathname).toBe("/edit-field");
  });

  test("trigger submit button click with valid textarea value", async () => {
    const submitBtn = screen.getByText("Submit");
    const textfield = screen.getByTestId(`textarea-field-${textAreaFieldData.name}`);
    userEvent.type(textfield, "Sample Document");

    fireEvent.click(submitBtn);

    // Submit completes successfully as we pass a valid textarea value
    // hence the view changes and goes back to the previous view.
    // Since we are accessing EditField component directly from root,
    // history,goBack() returns the root view.
    expect(history.location.pathname).toBe("/");
  });
});

describe("<EditField /> Select Tests", () => {
  let container;
  // sample field data for testing, passed into state of history
  const selectFieldData = {
    title: "Select Type",
    type: "select",
    required: "required",
    name: "type",
    options: [
      { id: 1, name: "Type-1" },
      { id: 2, name: "Type-2" },
      { id: 3, name: "Type-3" },
    ],
  };

  const history = createMemoryHistory();
  history.push("/edit-field", selectFieldData);

  beforeEach(() => {
    ({ container } = render(
      <DocumentContextProvider value={[documentInfo, setDocumentInfo]}>
        <Router history={history}>
          <EditField />
        </Router>
      </DocumentContextProvider>
    ));
  });

  afterEach(cleanup);

  test("renders DocumentMenu correctly", () => {
    expect(container).toMatchSnapshot();
  });

  test("renders title correctly", () => {
    expect(screen.getByText(/Select Type/i)).toBeInTheDocument();
  });

  test("renders a form field", () => {
    expect(screen.findByRole("form")).toBeTruthy();
    expect(container.getElementsByClassName("form")).toHaveLength(1);
  });

  test("renders a select field", async () => {
    const textfield = screen.getByTestId(`select-field-${selectFieldData.name}`);
    expect(screen.findByRole("select")).toBeTruthy();
    expect(textfield).toBeInTheDocument();
  });

  test("renders a submit button", () => {
    expect(screen.getByText("Submit")).toBeTruthy();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("submit button click on empty select value does not yeild", () => {
    const submitBtn = screen.getByText("Submit");
    fireEvent.click(submitBtn);
    expect(history.location.pathname).not.toBe("/document-edit");
    // Browser validation is working.
    // Submit did not complete since the value of the select is empty
    // hence the view does not change as tested below.
    expect(history.location.pathname).toBe("/edit-field");
  });

  test("trigger submit button click with valid select value", async () => {
    const submitBtn = screen.getByText("Submit");
    const selectfield = screen.getByTestId(`select-field-${selectFieldData.name}`);

    userEvent.selectOptions(selectfield, ["1"]);

    fireEvent.click(submitBtn);

    // Submit completes successfully as we pass a valid selected value
    // hence the view changes and goes back to the previous view.
    // Since we are accessing EditField component directly from root,
    // history,goBack() returns the root view.
    expect(history.location.pathname).toBe("/");
  });
});
