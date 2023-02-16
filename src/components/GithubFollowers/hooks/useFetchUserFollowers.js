import { useState } from "react";

import { fetchUserDetails, fetchAllPossibleFollowersFromUser } from "./utils";
import { DEFAULT_ERROR } from "../../shared/const";

const DEFAULT_STATE = {
  firstUser: null,
  secondUser: null,
  commonFollowersList: [],
  error: DEFAULT_ERROR,
};

export const useFetchUserFollowers = () => {
  const [data, setData] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);

  const resetSearch = () => {
    setData(DEFAULT_STATE);
  };

  const handleGetGithubUser = async ({
    firstUser,
    secondUser,
    handleRetrySearch,
  }) => {
    if (firstUser && secondUser) {
      try {
        setLoading(true);
        const [
          firstUserData,
          secondUserData,
          firstUserFollowers,
          secondUserFollowers,
        ] = await Promise.all([
          fetchUserDetails(firstUser),
          fetchUserDetails(secondUser),
          fetchAllPossibleFollowersFromUser(firstUser),
          fetchAllPossibleFollowersFromUser(secondUser),
        ]);

        const commonFollowers = firstUserFollowers.filter((firstFollowers) =>
          secondUserFollowers.some(
            (secondFollowers) => firstFollowers.login === secondFollowers.login
          )
        );

        setData({
          firstUserData,
          secondUserData,
          commonFollowersList: commonFollowers,
          error: DEFAULT_ERROR,
        });
      } catch (errorMessage) {
        setData(() => ({
          ...DEFAULT_STATE,
          error: {
            isError: true,
            message: errorMessage,
          },
        }));
        handleRetrySearch();
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    data,
    handleGetGithubUser,
    resetSearch,
    loading,
  };
};
