import {
  GitSearchForm,
  SubmitButton,
  GithubSearchField,
} from "./GithubForm.styles";

const GithubForm = ({
  gitUsername,
  setGitUsername,
  handleFollowerSearch,
  error,
}) => (
  <GitSearchForm onSubmit={handleFollowerSearch}>
    <GithubSearchField
      id="outlined-basic"
      label="Enter github username"
      variant="outlined"
      value={gitUsername}
      onChange={(e) => setGitUsername(e.target.value)}
      error={error.isError}
      helperText={error.message}
    />
    <SubmitButton variant="contained" type="submit">
      Search
    </SubmitButton>
  </GitSearchForm>
);

export default GithubForm;
