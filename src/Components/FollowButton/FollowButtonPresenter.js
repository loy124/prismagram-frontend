import React from "react";
import styled from "styled-components";
import Button from "../Button";

const FollowedButton = styled(Button)`
  background-color: ${props => props.theme.lightGreyColor};
`;

export default ({ isFollowing, onClick }) =>
  // <Button onClick={onClick} text={isFollowing ? "팔로잉" : "팔로우"}/>
  {
    if (isFollowing === true) {
      return <FollowedButton onClick={onClick} text={"팔로잉"} />;
    } else if (isFollowing === false) {
      return <Button onClick={onClick} text={"팔로우"} />;
    }
  };
