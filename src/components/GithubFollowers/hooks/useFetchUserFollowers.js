import { useState } from "react";

import { DEFAULT_ERROR } from "../../shared/const";
export const useFetchUserFollowers = () => {
  const [firstUserData, setFirstUserData] = useState(null);
  const [secondUserData, setSecondUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commonFollowerList, setCommonFollowerList] = useState([]);
  const [error, setError] = useState(DEFAULT_ERROR);

  const resetSearch = () => {
    setFirstUserData(null);
    setSecondUserData(null);
    setCommonFollowerList([]);
    setError(DEFAULT_ERROR);
  };

  const fetchAllPossibleFollowersFromUser = async (user) => {
    let page = 1;
    let allFollowers = [];
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const res = await fetch(
          `https://api.github.com/users/${user}/followers?page=${page}&per_page=100`
        );
        const followers = await res.json();
        if (followers.length === 0) {
          hasNextPage = false;
        } else {
          allFollowers = [...allFollowers, ...followers];
          page++;
        }
      } catch (error) {
        const errorMessage = `Failed to retrieve followers for user ${user}, please try again`;
        setError({ isError: true, message: errorMessage });
        throw new Error(errorMessage);
      }
    }

    return allFollowers;
  };

  const fetchUserDetails = async (user) => {
    const res = await fetch(`https://api.github.com/users/${user}`);
    return await res.json();
  };

  const handleGetGithubUser = async ({
    firstUser,
    secondUser,
    handleRetrySearch,
  }) => {
    if (error.isError) {
      setError(DEFAULT_ERROR);
    }
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
        setFirstUserData(firstUserData);
        setSecondUserData(secondUserData);
        setCommonFollowerList(commonFollowers);
      } catch (errorMessage) {
        setError({
          isError: true,
          message: "Failed to retrieve followers, please try again",
        });
        handleRetrySearch();
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    firstUserData,
    secondUserData,
    commonFollowerList,
    handleGetGithubUser,
    resetSearch,
    loading,
    error,
  };
};
