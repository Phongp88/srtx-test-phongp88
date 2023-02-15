import { useState, useEffect } from "react";

export const useFetchUserFollowers = () => {
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commonFollowerList, setCommonFollowerList] = useState([]);

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
    } catch (e) {
      throw new Error("Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    firstUser,
    secondUser,
    commonFollowerList,
    handleGetGithubUser,
    loading,
  };
};
