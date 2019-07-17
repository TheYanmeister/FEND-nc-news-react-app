import React from "react";

const DeleteButton = props => {
  const { user, author, handleCommentDelete, comment_id } = props;
  if (user === author) {
    return (
      <button onClick={handleCommentDelete} value={comment_id}>
        Delete
      </button>
    );
  } else return null;
};

export default DeleteButton;
