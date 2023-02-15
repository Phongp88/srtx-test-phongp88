import { useState, useEffect } from "react";

import {
  DEFAULT_ERROR,
  EMPTY_FIELD_ERROR,
  SAME_GITHUB_NAME_ERROR,
} from "../../shared/const";

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
      throw new Error(`Failed to retrieve followers for user ${user}`);
    }
  }

  return allFollowers;
};

const fetchUserDetails = async (user) => {
  const res = await fetch(`https://api.github.com/users/${user}`);
  return await res.json();
};

export const useFetchUserFollowers = () => {
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commonFollowerList, setCommonFollowerList] = useState([]);
  const [error, setError] = useState(DEFAULT_ERROR);

  const handleRetrySearch = () => {
    setFirstUser(null);
    setSecondUser(null);
  };

  const handleGetGithubUser = async (user) => {
    const trimmedValue = user.trim();
    if (trimmedValue.length === 0) {
      return setError(EMPTY_FIELD_ERROR);
    }

    if (firstUser && firstUser.login.toLowerCase() === user.toLowerCase()) {
      return setError(SAME_GITHUB_NAME_ERROR);
    }

    if (firstUser) {
      setSecondUser({ login: user });
      try {
        setLoading(true);
        const [
          firstUserData,
          secondUserData,
          firstUserFollowers,
          secondUserFollowers,
        ] = await Promise.all([
          fetchUserDetails(firstUser.login),
          fetchUserDetails(user),
          fetchAllPossibleFollowersFromUser(firstUser.login),
          fetchAllPossibleFollowersFromUser(user),
        ]);

        const commonFollowers = firstUserFollowers.filter((firstFollowers) =>
          secondUserFollowers.some(
            (secondFollowers) => firstFollowers.login === secondFollowers.login
          )
        );
        setFirstUser(firstUserData);
        setSecondUser(secondUserData);
        setCommonFollowerList(commonFollowers);
      } catch (errorMessage) {
        setError({ isError: true, message: errorMessage });
        handleRetrySearch();
      } finally {
        setLoading(false);
      }
    } else {
      setFirstUser({ login: user });
    }
  };

  return {
    firstUser,
    secondUser,
    commonFollowerList,
    handleGetGithubUser,
    handleRetrySearch,
    loading,
    error,
  };
};
