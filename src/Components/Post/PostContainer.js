import React, { useState } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
// import { ME } from "../SharedQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  // const { data: meQuery } = useQuery(ME);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const slidePrev = () => {
    const totalFiles = files.length;
    if (currentItem === 0) {
      setCurrentItem(totalFiles - 1);
    } else {
      setCurrentItem(currentItem - 1);
    }
  };

  const slideNext = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem(currentItem + 1);
    }
  };

  // useEffect(() => {
  //   const totalFiles = files.length;
  //   if (currentItem === totalFiles - 1) {
  //     setTimeout(() => setCurrentItem(0), 2000);
  //   } else {
  //     setTimeout(() => setCurrentItem(currentItem + 1), 2000);
  //   }
  // }, [currentItem, files]);
  // console.log(currentItem, files);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedState === true) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
  };

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      // addCommentMutation();
      e.preventDefault();
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([
          ...selfComments,
          // {
          //   id: Math.floor(Math.random() * 100),
          //   text: comment.value,
          //   user: { username: meQuery.me.username }
          // }
          addComment
        ]);
        comment.setValue("");
      } catch {
        toast.error(" 댓글을 입력할 수 없습니다 다시 시도해 보세요");
      }
    }
    return;
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      location={location}
      caption={caption}
      isLiked={isLikedState}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      slidePrev={slidePrev}
      slideNext={slideNext}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
