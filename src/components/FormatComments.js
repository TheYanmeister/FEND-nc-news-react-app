import React from "react";
import DeleteButton from "./DeleteButton";
import VoteButtons from "./VoteButtons";

const FormatComments = props => {
  const { user } = props;
  return props.comments.map(comment => (
    <li key={comment.comment_id} className="articleComments">
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
      {user === comment.author ? (
        <section className="articleComments_deleteButton">
          <DeleteButton
            user={user}
            author={comment.author}
            handleCommentDelete={props.handleCommentDelete}
            comment_id={comment.comment_id}
          />
        </section>
      ) : null}
    </li>
  ));
};

export default FormatComments;
