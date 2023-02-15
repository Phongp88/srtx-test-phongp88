import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const openGithubProfile = (url) => {
  window.open(url, "_blank");
};

const GithubFollowersList = ({ followers }) => {
  return (
    <>
      <nav>
        <List>
          {followers.length !== 0 &&
            followers.map(({ login, id, avatar_url, html_url }) => (
              <ListItem disablePadding key={id}>
                <ListItemButton onClick={() => openGithubProfile(html_url)}>
                  <ListItemIcon>
                    <Avatar alt="avatar profile picture" src={avatar_url} />
                  </ListItemIcon>
                  <ListItemText primary={login} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>
    </>
  );
};

export default GithubFollowersList;
