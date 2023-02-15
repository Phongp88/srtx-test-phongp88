import * as React from "react";
import {
  AvatarCard,
  AvatarPictureContainer,
  AvatarPicture,
} from "./GithubAvatar.styles";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const GithubAvatar = ({ user }) => {
  const { username, followers } = user;
  return (
    <AvatarCard>
      <CardContent>
        <AvatarPictureContainer>
          <AvatarPicture alt="default avatar" src="assets/defaultPfp.png" />
        </AvatarPictureContainer>
        <Typography variant="h3" component="div" textAlign={"center"}>
          {username.toLowerCase()}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
          textAlign={"center"}
        >
          Has {followers.length} followers
        </Typography>
      </CardContent>
    </AvatarCard>
  );
};

export default GithubAvatar;
