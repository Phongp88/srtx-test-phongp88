import { STRINGS } from "./strings";

export const DEFAULT_ERROR = {
  isError: false,
  message: "",
};

export const EMPTY_FIELD_ERROR = {
  isError: true,
  message: STRINGS.EMPTY_FIELD_ERROR,
};

export const SAME_GITHUB_NAME_ERROR = {
  isError: true,
  message: STRINGS.SAME_USER_ERROR,
};
