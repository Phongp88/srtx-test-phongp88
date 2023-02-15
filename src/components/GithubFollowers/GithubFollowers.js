import { useState } from "react";

import Typography from "@mui/material/Typography";

import GithubForm from "../GithubFindForm/GithubForm";
import GithubAvatar from "../GithubAvatar/GithubAvatar";
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
  } = useFetchUserFollowers();

  const handleFollowerSearch = (e) => {
    e.preventDefault();
    handleGetGithubUser(gitUsername);
    setGitUsername("");
  };

  return (
    <>
      <GithubForm
        gitUsername={gitUsername}
        setGitUsername={setGitUsername}
        handleFollowerSearch={handleFollowerSearch}
      />
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
