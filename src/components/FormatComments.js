import React from "react";
import DeleteButton from "./DeleteButton";
import VoteButtons from "./VoteButtons";

const FormatComments = props => {
  return props.comments.map(comment => (
    <li key={comment.comment_id}>
      <p className="articleComments_body">{comment.body}</p>
      <br /> <p className="articleComments_author">
        User: {comment.author}
      </p>{" "}
      <br />{" "}
      <section className="articlesComments_voteButtons">
        <VoteButtons
          votes={comment.votes}
          comment_id={comment.comment_id}
          isComment={true}
          author={comment.author}
          user={props.user}
        />
      </section>
      <section className="articleComments_deleteButton">
        <DeleteButton
          user={props.user}
          author={comment.author}
          handleCommentDelete={props.handleCommentDelete}
          comment_id={comment.comment_id}
        />
      </section>
    </li>
  ));
};

export default FormatComments;
