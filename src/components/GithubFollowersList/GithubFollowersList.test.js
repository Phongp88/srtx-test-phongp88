import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import GithubFollowersList from "./GithubFollowersList";

const TEST_USER = {
  login: "testuser",
  id: "1234",
  avatar_url: "testurl",
  html_url: "htmlurl",
};

const renderComponent = ({ followers = [] }) =>
  render(<GithubFollowersList followers={followers} />);

describe("GithubFollowersList component", () => {
  it("Should render one user in the followers list", () => {
    renderComponent({
      followers: [TEST_USER],
    });

    expect(screen.queryByText(TEST_USER.login)).toBeInTheDocument();
  });

  it("Should render the alt image if url is invalid", () => {
    renderComponent({ followers: [TEST_USER] });

    expect(screen.getByAltText("avatar profile picture")).toBeInTheDocument();
  });

  it("Should not render anything followers are empty", () => {
    renderComponent({});

    expect(screen.queryByText(TEST_USER.login)).not.toBeInTheDocument();

    expect(
      screen.queryByAltText("avatar profile picture")
    ).not.toBeInTheDocument();
  });
});
