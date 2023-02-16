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
  const {
    data: { firstUserData, secondUserData, error, commonFollowersList },
    handleGetGithubUser,
    resetSearch,
    loading,
  } = useFetchUserFollowers();

  const githubInputText = firstUser ? STRINGS.SECOND_USER : STRINGS.FIRST_USER;

  const setUserProps = {
    firstUser,
    setFirstUser,
  };

  const handleRetrySearch = () => {
    resetSearch();
    setFirstUser(null);
  };

  const displaySearchUsers = !firstUserData || !secondUserData;

  const displayUserAvatars = firstUserData && secondUserData;

  if (loading) {
    return <p>{STRINGS.LOADING}</p>;
  }

  return (
    <>
      {displaySearchUsers ? (
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
      {displayUserAvatars && (
        <FollowersContainer>
          <AvatarContainer>
            <GithubAvatar user={firstUserData} />
            <GithubAvatar user={secondUserData} />
          </AvatarContainer>
          <Typography>
            {STRINGS.BOTH_USERS} {commonFollowersList.length}{" "}
            {STRINGS.COMMON_FOLLOWERS}
          </Typography>
          {commonFollowersList.length > 0 && (
            <GithubFollowersList followers={commonFollowersList} />
          )}
        </FollowersContainer>
      )}
    </>
  );
};

export default GithubFollowers;
