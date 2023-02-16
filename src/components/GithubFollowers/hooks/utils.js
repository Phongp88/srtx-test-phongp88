import { STRINGS } from "../../shared/strings";

export const fetchAllPossibleFollowersFromUser = async (user) => {
  let page = 1;
  let allFollowers = [];
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${user}/followers?page=${page}&per_page=100`
      );
      const followers = await res.json();
      if (followers.length === 0) {
        hasNextPage = false;
      } else {
        allFollowers = [...allFollowers, ...followers];
        page++;
      }
    } catch (error) {
      const errorMessage = `${STRINGS.FAILED_TO_GET_FOLLOWERS}, ${user} ${STRINGS.PLEASE_TRY_AGAIN}`;
      throw new Error(errorMessage);
    }
  }

  return allFollowers;
};

export const fetchUserDetails = async (user) => {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`);
    return await res.json();
  } catch {
    const errorMessage = `${STRINGS.FAILED_TO_FETCH_USER}, ${user}`;
    throw new Error(errorMessage);
  }
};
