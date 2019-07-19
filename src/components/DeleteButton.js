import React from "react";

const DeleteButton = props => {
  const { handleCommentDelete, comment_id } = props;
  return (
    <button onClick={handleCommentDelete} value={comment_id}>
      Delete
    </button>
  );
};

export default DeleteButton;
