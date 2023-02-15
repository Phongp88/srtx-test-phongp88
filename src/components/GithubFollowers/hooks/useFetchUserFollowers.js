import { useState, useEffect } from "react";

import {
  DEFAULT_ERROR,
  EMPTY_FIELD_ERROR,
  SAME_GITHUB_NAME_ERROR,
} from "../../shared/const";

export const useFetchUserFollowers = () => {
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commonFollowerList, setCommonFollowerList] = useState([]);
  const [error, setError] = useState(DEFAULT_ERROR);

  useEffect(() => {
    if (firstUser && secondUser) {
      const commonFollowers = firstUser.followers.filter((firstUserFollowers) =>
        secondUser.followers.some(
          (secondUserFollowers) =>
            firstUserFollowers.login === secondUserFollowers.login
        )
      );
      setCommonFollowerList(commonFollowers);
    }
  }, [firstUser, secondUser]);

  const handleGetGithubUser = (githubUser) => {
    if (githubUser === "") {
      setError(EMPTY_FIELD_ERROR);
      return;
    }

    if (
      firstUser &&
      firstUser.username.toLowerCase() === githubUser.toLowerCase()
    ) {
      setError(SAME_GITHUB_NAME_ERROR);
      return;
    }
    try {
      setLoading(true);
      fetch(`https://api.github.com/users/${githubUser}/followers`).then(
        async (res) => {
          const data = await res.json();
          if (firstUser === null) {
            setFirstUser({
              username: githubUser,
              followers: data,
            });
          } else {
            setSecondUser({ username: githubUser, followers: data });
          }
        }
      );
    } catch (errorMessage) {
      throw new Error({ message: errorMessage });
    } finally {
      setLoading(false);
      if (error.isError) {
        setError(DEFAULT_ERROR);
      }
    }
  };

  return {
    firstUser,
    secondUser,
    commonFollowerList,
    handleGetGithubUser,
    loading,
    error,
  };
};
