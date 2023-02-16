jest.mock("./hooks/useFetchUserFollowers");

import React from "react";
import { screen, render } from "@testing-library/react";
import { useFetchUserFollowers } from "./hooks/useFetchUserFollowers";
import "@testing-library/jest-dom";

import GithubFollowers from "./";
import { STRINGS } from "../shared/strings";

const TEST_USER1 = { login: "testuser", avatar_url: "testURL" };
const TEST_USER2 = { login: "janedoe", avatar_url: "testURL" };
const COMMON_FOLLOWER = {
  login: "johndoe",
  id: "1234",
  avatar_url: "testurl",
  html_url: "htmlurl",
};

const renderComponent = () => render(<GithubFollowers />);

const mockUseFetchUserFollowers = useFetchUserFollowers;

mockUseFetchUserFollowers.mockReturnValue({
  data: {
    firstUserData: null,
    secondUserData: null,
    error: { isError: false, message: "" },
    commonFollowersList: [],
  },
  loading: false,
  handleGetGithubUser: jest.fn(),
  resetSearch: jest.fn(),
});

describe("GithubFollowers component", () => {
  it("Should render the input field if either user is null and button", () => {
    renderComponent({});

    const inputFiled = screen.getByLabelText(STRINGS.FIRST_USER);
    const button = screen.getByRole("button");
    expect(inputFiled).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Should render both users and display that they have 0 followers", () => {
    mockUseFetchUserFollowers.mockReturnValue({
      data: {
        firstUserData: TEST_USER1,
        secondUserData: TEST_USER2,
        error: { isError: false, message: "" },
        commonFollowersList: [],
      },
      loading: false,
      handleGetGithubUser: jest.fn(),
      resetSearch: jest.fn(),
    });
    renderComponent({});

    expect(screen.queryByText(TEST_USER1.login)).toBeInTheDocument();
    expect(screen.queryByText(TEST_USER2.login)).toBeInTheDocument();
    expect(
      screen.queryByText(`${STRINGS.BOTH_USERS} 0 ${STRINGS.COMMON_FOLLOWERS}`)
    ).toBeInTheDocument();
  });

  it("Should display loading if loading is true", () => {
    mockUseFetchUserFollowers.mockReturnValue({
      data: {
        firstUserData: TEST_USER1,
        secondUserData: TEST_USER2,
        error: { isError: false, message: "" },
        commonFollowersList: [],
      },
      loading: true,
      handleGetGithubUser: jest.fn(),
      resetSearch: jest.fn(),
    });
    renderComponent({});

    expect(screen.queryByText(STRINGS.LOADING)).toBeInTheDocument();
  });

  it("Should display search again button when both users are displayed", () => {
    const mockResetSearch = jest.fn();
    mockUseFetchUserFollowers.mockReturnValue({
      data: {
        firstUserData: TEST_USER1,
        secondUserData: TEST_USER2,
        error: { isError: false, message: "" },
        commonFollowersList: [],
      },
      loading: false,
      handleGetGithubUser: jest.fn(),
      resetSearch: mockResetSearch,
    });
    renderComponent({});

    const button = screen.queryByText(STRINGS.SEARCH_AGAIN);

    expect(button).toBeInTheDocument();
  });

  it("Should display one common follower", () => {
    const mockResetSearch = jest.fn();
    mockUseFetchUserFollowers.mockReturnValue({
      data: {
        firstUserData: TEST_USER1,
        secondUserData: TEST_USER2,
        error: { isError: false, message: "" },
        commonFollowersList: [COMMON_FOLLOWER],
      },
      loading: false,
      handleGetGithubUser: jest.fn(),
      resetSearch: mockResetSearch,
    });
    renderComponent({});

    expect(
      screen.queryByText(`${STRINGS.BOTH_USERS} 1 ${STRINGS.COMMON_FOLLOWERS}`)
    ).toBeInTheDocument();

    expect(screen.queryByText("johndoe")).toBeInTheDocument();
  });
});
