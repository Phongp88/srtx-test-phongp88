import { useState } from "react";

import {
  GitSearchForm,
  SubmitButton,
  GithubSearchField,
} from "./GithubForm.styles";

import { STRINGS } from "../shared/strings";
import {
  DEFAULT_ERROR,
  EMPTY_FIELD_ERROR,
  SAME_GITHUB_NAME_ERROR,
} from "../shared/const";

const GithubForm = ({
  handleGetGithubUser,
  error,
  githubInputText,
  setUserProps,
  handleRetrySearch,
}) => {
  const [gitUsername, setGitUsername] = useState("");
  const [inputError, setInputError] = useState({ isError: false, message: "" });

  const { firstUser, setFirstUser, setSecondUser } = setUserProps;

  const handleFollowerSearch = (e) => {
    e.preventDefault();
    if (gitUsername === "") {
      return setInputError(EMPTY_FIELD_ERROR);
    }

    if (!firstUser) {
      setFirstUser(gitUsername);
    } else {
      if (firstUser && firstUser.toLowerCase() === gitUsername.toLowerCase()) {
        return setInputError(SAME_GITHUB_NAME_ERROR);
      }
      setSecondUser(gitUsername);
      handleGetGithubUser({
        firstUser,
        secondUser: gitUsername,
        handleRetrySearch,
      });
    }

    setGitUsername("");
    if (inputError.isError) {
      setInputError(DEFAULT_ERROR);
    }
  };

  return (
    <GitSearchForm onSubmit={handleFollowerSearch}>
      <GithubSearchField
        id="outlined-basic"
        label={githubInputText}
        variant="outlined"
        value={gitUsername}
        onChange={(e) => setGitUsername(e.target.value)}
        error={error.isError | inputError.isError}
        helperText={
          error.isError
            ? error.message
            : inputError.isError
            ? inputError.message
            : ""
        }
      />
      <SubmitButton variant="contained" type="submit">
        {STRINGS.SEARCH}
      </SubmitButton>
    </GitSearchForm>
  );
};

export default GithubForm;
