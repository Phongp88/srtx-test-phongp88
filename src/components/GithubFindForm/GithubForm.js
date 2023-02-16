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

const validateUser = (firstUser, secondUser) => {
  return firstUser.toLowerCase() === secondUser.toLowerCase();
};

const GithubForm = ({
  handleGetGithubUser,
  error,
  githubInputText,
  setUserProps,
  handleRetrySearch,
}) => {
  const [inputError, setInputError] = useState({ isError: false, message: "" });

  const { firstUser, setFirstUser } = setUserProps;

  const handleFollowerSearch = (e) => {
    e.preventDefault();

    const gitUsername = e.target.githubusername.value.trim();
    if (gitUsername.length === 0) {
      return setInputError(EMPTY_FIELD_ERROR);
    }

    if (firstUser) {
      if (validateUser(firstUser, gitUsername)) {
        return setInputError(SAME_GITHUB_NAME_ERROR);
      }
      handleGetGithubUser({
        firstUser,
        secondUser: gitUsername,
        handleRetrySearch,
      });
    } else {
      setFirstUser(gitUsername);
    }
    if (inputError.isError) {
      setInputError(DEFAULT_ERROR);
    }
    e.target.githubusername.value = "";
  };

  return (
    <GitSearchForm onSubmit={handleFollowerSearch} name="searchGithubUsers">
      <GithubSearchField
        id="outlined-basic"
        name="githubusername"
        label={githubInputText}
        variant="outlined"
        error={error.isError || inputError.isError}
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
