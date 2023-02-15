import { useState } from "react";

import Typography from "@mui/material/Typography";

import GithubForm from "../GithubFindForm/GithubForm";
import GithubAvatar from "../GithubAvatar/GithubAvatar";
import GithubFollowersList from "../GithubFollowersList/GithubFollowersList";
import { AvatarContainer, FollowersContainer } from "./GithubFollowers.styles";
import { useFetchUserFollowers } from "./hooks/useFetchUserFollowers";

const GithubFollowers = () => {
  const [gitUsername, setGitUsername] = useState("");

  const {
    loading,
    handleGetGithubUser,
    firstUser,
    secondUser,
    commonFollowerList,
    error,
  } = useFetchUserFollowers();

  const handleFollowerSearch = (e) => {
    e.preventDefault();
    handleGetGithubUser(gitUsername);
    setGitUsername("");
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {(!firstUser || !secondUser) && (
        <GithubForm
          gitUsername={gitUsername}
          setGitUsername={setGitUsername}
          handleFollowerSearch={handleFollowerSearch}
          error={error}
        />
      )}
      {firstUser && secondUser && (
        <FollowersContainer>
          <AvatarContainer>
            <GithubAvatar user={firstUser} />
            <GithubAvatar user={secondUser} />
          </AvatarContainer>
          <Typography>
            Both users have {commonFollowerList.length} common followers!
          </Typography>
          {commonFollowerList.length > 0 && (
            <GithubFollowersList followers={commonFollowerList} />
          )}
        </FollowersContainer>
      )}
    </>
  );
};

export default GithubFollowers;
