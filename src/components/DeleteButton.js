import React from "react";

const DeleteButton = props => {
  const { user, author } = props;
  if (user === author) {
    return <button>Delete</button>;
  } else return null;
};

export default DeleteButton;
