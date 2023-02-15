import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import GithubForm from "../GithubFindForm/GithubForm";
import GithubAvatar from "../GithubAvatar/GithubAvatar";
import GithubFollowersList from "../GithubFollowersList/GithubFollowersList";
import {
  AvatarContainer,
  FollowersContainer,
  CenterContainer,
} from "./GithubFollowers.styles";
import { useFetchUserFollowers } from "./hooks/useFetchUserFollowers";
import { STRINGS } from "../shared/strings";

const GithubFollowers = () => {
  const [gitUsername, setGitUsername] = useState("");

  const {
    loading,
    handleGetGithubUser,
    firstUser,
    secondUser,
    commonFollowerList,
    handleRetrySearch,
    error,
  } = useFetchUserFollowers();

  const handleFollowerSearch = (e) => {
    e.preventDefault();
    handleGetGithubUser(gitUsername);
    setGitUsername("");
  };

  const githubInputText = firstUser ? STRINGS.SECOND_USER : STRINGS.FIRST_USER;

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {!firstUser || !secondUser ? (
        <GithubForm
          gitUsername={gitUsername}
          setGitUsername={setGitUsername}
          handleFollowerSearch={handleFollowerSearch}
          error={error}
          githubInputText={githubInputText}
        />
      ) : (
        <CenterContainer>
          <Button variant="contained" onClick={() => handleRetrySearch()}>
            Search Again
          </Button>
        </CenterContainer>
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
