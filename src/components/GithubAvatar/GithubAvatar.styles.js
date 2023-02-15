import styled from "styled-components";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";

export const AvatarCard = styled(Card)`
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 10px;
`;

export const AvatarPictureContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const AvatarPicture = styled(Avatar)`
  height: 100px;
  width: 100px;
`;
