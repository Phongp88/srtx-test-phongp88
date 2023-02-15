import { useState } from "react";

import Typography from "@mui/material/Typography";

import GithubForm from "../GithubFindForm/GithubForm";
import GithubAvatar from "../GithubAvatar/GithubAvatar";
import { AvatarContainer, FollowersContainer } from "./GithubFollowers.styles";
import { useFetchUserFollowers } from "./hooks/useFetchUserFollowers";
import {
  DEFAULT_ERROR,
  EMPTY_FIELD_ERROR,
  SAME_GITHUB_NAME_ERROR,
} from "../const";

const GithubFollowers = () => {
  const [gitUsername, setGitUsername] = useState("");
  const [error, setError] = useState(DEFAULT_ERROR);

  const {
    loading,
    handleGetGithubUser,
    firstUser,
    secondUser,
    commonFollowerList,
  } = useFetchUserFollowers();

  const handleFollowerSearch = (e) => {
    e.preventDefault();
    if (gitUsername === "") {
      setError(EMPTY_FIELD_ERROR);
    } else if (
      firstUser &&
      firstUser.username.toLowerCase() === gitUsername.toLowerCase()
    ) {
      setError(SAME_GITHUB_NAME_ERROR);
    } else {
      handleGetGithubUser(gitUsername);
      setGitUsername("");
      if (error.isError) {
        setError(DEFAULT_ERROR);
      }
    }
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
        </FollowersContainer>
      )}
    </>
  );
};

export default GithubFollowers;
