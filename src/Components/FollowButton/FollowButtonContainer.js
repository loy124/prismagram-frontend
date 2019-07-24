import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_FOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingState, setIsFollowing] = useState(isFollowing);
  // const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  // const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });
  const [togglefollowMutation] = useMutation(TOGGLE_FOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingState === true) {
      setIsFollowing(false);
      togglefollowMutation();
    } else {
      setIsFollowing(true);
      togglefollowMutation();
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingState} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;