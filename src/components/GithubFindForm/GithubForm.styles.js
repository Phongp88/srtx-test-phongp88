import styled from "styled-components";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const GitSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  height: 50px;
  margin-left: 10px;
`;

export const GithubSearchField = styled(TextField)`
  width: 300px;
  > p {
    height: 0;
  }
`;
