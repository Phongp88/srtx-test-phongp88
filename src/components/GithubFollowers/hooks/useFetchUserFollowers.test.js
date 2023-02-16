import { renderHook, act } from "@testing-library/react";
import { useFetchUserFollowers } from "./useFetchUserFollowers";

import { STRINGS } from "../../shared/strings";
import * as utils from "./utils";

jest.mock("./utils");

describe("useFetchUserFollowers", () => {
  it("Should fetch user details when passed valid inputs", async () => {
    const firstUserData = { login: "user1" };
    const secondUserData = { login: "user2" };
    const commonFollowers = [{ login: "common_follower" }];

    utils.fetchUserDetails.mockResolvedValueOnce(firstUserData);
    utils.fetchUserDetails.mockResolvedValueOnce(secondUserData);
    utils.fetchAllPossibleFollowersFromUser.mockResolvedValueOnce([
      { login: "user1_follower" },
      { login: "common_follower" },
    ]);
    utils.fetchAllPossibleFollowersFromUser.mockResolvedValueOnce([
      { login: "user2_follower" },
      { login: "common_follower" },
    ]);

    const { result } = renderHook(() => useFetchUserFollowers());

    // Call the hook with the first user value
    await act(async () => {
      result.current.handleGetGithubUser({
        firstUser: "user1",
        secondUser: "user2",
        handleRetrySearch: jest.fn(),
      });
    });

    expect(result.current.data.firstUserData).toBeDefined();
    expect(result.current.data.firstUserData.login).toBe("user1");

    expect(result.current.data.secondUserData.login).toBe("user2");
    expect(result.current.data.commonFollowersList).toEqual(commonFollowers);
  });

  it("should set error message if failed to retrieve followers", async () => {
    const errorMessage = STRINGS.FAILED_TO_GET_FOLLOWERS;

    utils.fetchUserDetails.mockResolvedValueOnce({ login: "user1" });
    utils.fetchUserDetails.mockResolvedValueOnce({ login: "user2" });
    utils.fetchAllPossibleFollowersFromUser.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useFetchUserFollowers());

    await act(async () => {
      result.current.handleGetGithubUser({
        firstUser: "user1",
        secondUser: "user2",
        handleRetrySearch: jest.fn(),
      });
    });

    expect(result.current.data.error.isError).toBe(true);
    expect(result.current.data.error.message).toBe(errorMessage);
  });

  it("should set error message if failed to retrieve ", async () => {
    const errorMessage = STRINGS.FAILED_TO_GET_FOLLOWERS;

    utils.fetchUserDetails.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useFetchUserFollowers());

    await act(async () => {
      result.current.handleGetGithubUser({
        firstUser: "user1",
        secondUser: "user2",
        handleRetrySearch: jest.fn(),
      });
    });

    expect(result.current.data.error.isError).toBe(true);
    expect(result.current.data.error.message).toBe(errorMessage);
  });
});
