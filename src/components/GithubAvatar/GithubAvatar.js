import * as React from "react";
import {
  AvatarCard,
  AvatarPictureContainer,
  AvatarPicture,
} from "./GithubAvatar.styles";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const GithubAvatar = ({ user }) => {
  return (
    <AvatarCard>
      <CardContent>
        <AvatarPictureContainer>
          <AvatarPicture alt="default avatar" src={user.avatar_url} />
        </AvatarPictureContainer>
        <Typography variant="h4" component="div" textAlign={"center"}>
          {user.login.toLowerCase()}
        </Typography>
      </CardContent>
    </AvatarCard>
  );
};

export default GithubAvatar;
