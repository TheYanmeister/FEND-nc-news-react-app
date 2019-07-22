import React, { Component } from "react";
import DeleteButton from "./DeleteButton";
import VoteButtons from "./VoteButtons";
import * as api from "./api";

class FormatComments extends Component {
  state = { comments: [] };

  componentDidMount() {
    api
      .fetchCommentsByArticle(this.props.article_id)
      .then(comments => this.setState({ comments: comments.comments }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state;
    const { getCommentCount } = this.props;
    if (prevState.comments !== comments) getCommentCount(comments.length);
  }

  render() {
    const { user } = this.props;
    const { comments } = this.state;
    return comments.map(comment => (
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
            user={this.props.user}
          />
        </section>
        {user === comment.author ? (
          <section className="articleComments_deleteButton">
            <DeleteButton
              user={user}
              author={comment.author}
              handleCommentDelete={this.props.handleCommentDelete}
              comment_id={comment.comment_id}
            />
          </section>
        ) : null}
      </li>
    ));
  }
}

export default FormatComments;
