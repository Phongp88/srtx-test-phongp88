import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import GithubForm from "./GithubForm";

import { STRINGS } from "../shared/strings";

const renderComponent = ({
  handleGetGithubUser = () => jest.fn(),
  error = {},
  githubInputText = STRINGS.FIRST_USER,
  setUserProps = { firstUser: null, setFirstUser: () => jest.fn() },
  handleRetrySearch = () => jest.fn(),
}) =>
  render(
    <GithubForm
      handleGetGithubUser={handleGetGithubUser}
      error={error}
      githubInputText={githubInputText}
      setUserProps={setUserProps}
      handleRetrySearch={handleRetrySearch}
    />
  );

describe("GithubForm component", () => {
  it("Should render the form component with the input field", () => {
    renderComponent({});
    const inputFiled = screen.getByLabelText(STRINGS.FIRST_USER);

    expect(inputFiled).toBeInTheDocument();
  });

  it("Should render the form component with the search button", () => {
    renderComponent({});
    const searchButton = screen.getByRole("button");

    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent(STRINGS.SEARCH);
  });

  it("Should render the form component input with new label when githubInputText is passed in", () => {
    renderComponent({ githubInputText: STRINGS.SECOND_USER });

    const inputFiled = screen.queryByLabelText(STRINGS.FIRST_USER);
    const newInputField = screen.getByLabelText(STRINGS.SECOND_USER);

    expect(inputFiled).not.toBeInTheDocument();
    expect(newInputField).toBeInTheDocument();
  });

  it("Should render the form component input with new label when githubInputText is passed in", () => {
    renderComponent({ githubInputText: STRINGS.SECOND_USER });

    const inputFiled = screen.queryByLabelText(STRINGS.FIRST_USER);
    const newInputField = screen.getByLabelText(STRINGS.SECOND_USER);

    expect(inputFiled).not.toBeInTheDocument();
    expect(newInputField).toBeInTheDocument();
  });

  it("Should render the error in the text field when passed in", async () => {
    renderComponent({
      error: { isError: true, message: "An error has been thrown" },
    });

    const inputField = screen.queryByText("An error has been thrown");

    expect(inputField).toBeInTheDocument();
  });
});
