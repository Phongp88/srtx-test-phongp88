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
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const {
    firstUserData,
    secondUserData,
    loading,
    handleGetGithubUser,
    commonFollowerList,
    resetSearch,
    error,
  } = useFetchUserFollowers();

  const githubInputText = firstUser ? STRINGS.SECOND_USER : STRINGS.FIRST_USER;

  if (loading) {
    return <>{STRINGS.LOADING}</>;
  }

  const setUserProps = {
    firstUser,
    setFirstUser,
    setSecondUser,
  };

  const handleRetrySearch = () => {
    resetSearch();
    setFirstUser(null);
    setSecondUser(null);
  };

  return (
    <>
      {!firstUser || !secondUser ? (
        <GithubForm
          handleGetGithubUser={handleGetGithubUser}
          error={error}
          githubInputText={githubInputText}
          setUserProps={setUserProps}
          handleRetrySearch={handleRetrySearch}
        />
      ) : (
        <CenterContainer>
          <Button variant="contained" onClick={() => handleRetrySearch()}>
            {STRINGS.SEARCH_AGAIN}
          </Button>
        </CenterContainer>
      )}
      {firstUserData && secondUserData && (
        <FollowersContainer>
          <AvatarContainer>
            <GithubAvatar user={firstUserData} />
            <GithubAvatar user={secondUserData} />
          </AvatarContainer>
          <Typography>
            {STRINGS.BOTH_USERS} {commonFollowerList.length}{" "}
            {STRINGS.COMMON_FOLLOWERS}
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
