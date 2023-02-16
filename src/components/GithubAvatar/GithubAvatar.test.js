import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import GithubAvatar from "./GithubAvatar";

const TEST_USER = { login: "testuser", avatar_url: "testURL" };

const renderComponent = ({ user = {} }) => render(<GithubAvatar user={user} />);

describe("GithubForm component", () => {
  it("Should render the form component with correct username", () => {
    renderComponent({ user: TEST_USER });

    expect(screen.queryByText("testuser")).toBeInTheDocument();
  });

  it("Should render the alt image if url is invalid", () => {
    renderComponent({ user: TEST_USER });

    expect(screen.getByAltText("default avatar")).toBeInTheDocument();
  });
});
